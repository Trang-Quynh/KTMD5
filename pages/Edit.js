import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../firebase/storage";
import * as Yup from "yup";
import {getCategories, getOneProduct, updateOneProduct} from "../service/productService";
import React from 'react';

const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    description: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    category: Yup.number()
        .required('Required')
});

export function Edit() {
    const [files, setFiles] = useState([]);
    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch();
    const currentProduct = useSelector(({products})=>{
        return products.currentProduct;
    })
    const listCategory = useSelector(({products})=>{
        return products.listCategory
    })
    useEffect(() => {
        dispatch(getOneProduct(id));
        dispatch(getCategories())
    }, [dispatch,id]);

    const handleChange = async (event, setFieldValue) =>{
        const selectedFiles = Array.from(event.target.files);
        setFiles(selectedFiles);
        await handleUpload(selectedFiles, setFieldValue);
    }

    const handleUpload = async (files, setFieldValue) => {
        if (!files) {
            alert("Please upload an image first!");
        }
        const uploadPromises = files.map((file) => {
            const storageRef = ref(storage, `/files/${file.name}`);
            const uploadTask = uploadBytesResumable(storageRef, file);

            return new Promise((resolve, reject) => {
                uploadTask.on(
                    "state_changed",
                    null,
                    reject,
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref)
                            .then((url) => {
                                resolve(url);
                            })
                            .catch(reject);
                    }
                );
            });
        });

        try {
            const imageUrls = await Promise.all(uploadPromises);
            setFieldValue("images", [...currentProduct.images, ...imageUrls]);
            setFiles([]);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            {currentProduct && id == currentProduct.id && (
                <Formik
                    initialValues={{
                        id: currentProduct.id,
                        name: currentProduct.name,
                        description: currentProduct.description,
                        images: currentProduct.images,
                        category: currentProduct.category.id

                    }}
                    validationSchema={SchemaError}
                    onSubmit={(values) => {
                        console.log(values)
                        dispatch(updateOneProduct(values)).then(() => {
                            navigate('/home/list');
                        });
                    }}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <Field
                                type="text"
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="name"/>
                            </p>
                            <Field
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={(e) =>
                                    setFieldValue("description", e.target.value)
                                }
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="description"/>
                            </p>
                            <Field as="select" name="category" placeholder="Category" onChange={(e) =>
                                setFieldValue("category", e.target.value)
                            }>
                                <option value="">Select a category</option>
                                {listCategory.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                        selected={item.id === currentProduct.category.id}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </Field>
                            <p style={{color: "red"}}>
                                <ErrorMessage name="category"/>
                            </p>

                            <div>
                                <Field type="file" multiple name={'myImage'}  onChange={(e) =>{handleChange(e, setFieldValue)}} accept="/image/*" />
                                {console.log(values.images)}
                                {values.images.map((image, index) => (
                                    <div key={index}>
                                        <img src={image.url} width="20px" alt={''} />
                                    </div>
                                ))}
                            </div>
                            <button type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}


