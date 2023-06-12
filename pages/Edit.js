import {ErrorMessage, Field, Form, Formik} from "formik";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import storage from "../firebase/storage";
import * as Yup from "yup";
import {getCategories, getOneProduct, updateOneProduct} from "../service/productService";
import React from 'react';
import './edit.css'

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
    const [isDelete, setIsDelete] = useState(true);
    const [isSubmit, setIsSubmit] = useState(false)
    const [productFetched, setProductFetched] = useState(false)



    const dispatch = useDispatch();
    const currentProduct = useSelector(({products})=>{
        if(productFetched === true){
            console.log(products.currentProduct);
            return products.currentProduct;
        }
        return null
    })
    const listCategory = useSelector(({products})=>{
        return products.listCategory
    })
    useEffect(() => {
        dispatch(getOneProduct(id)).then(()=>{
            setProductFetched(true)
        });
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
            setFieldValue("images", [...imageUrls]);
            setIsSubmit(false)
            setFiles([]);
        } catch (error) {
            console.error(error);
        }
    };


    const handleDeleteAllImages = (setFieldValue) => {
        setFieldValue("images", []);
        setIsSubmit(true)
        setIsDelete(false)
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
                                <div>
                                    <Field name="myImage">
                                        {(props) => (
                                            <input
                                                {...props.field}
                                                type="file"
                                                id="myImage"
                                                multiple
                                                name="myImage"
                                                onChange={(e) => { handleChange(e, setFieldValue) }}
                                                accept="image/*"
                                                disabled={isDelete}
                                            />
                                        )}
                                    </Field>
                                </div>
                                <div className="image-container" >
                                    {values.images.map((image, index) => (
                                        <div key={index} className="image">
                                            {image.url ? (
                                                <img src={image.url} alt="" />
                                            ) : (
                                                <img src={image} alt="" />
                                            )}
                                        </div>
                                    ))}
                                    {values.images.length > 0 &&
                                        <button className="delete-all" onClick={() => handleDeleteAllImages(setFieldValue)}>x</button>
                                    }
                                </div>
                            </div>
                            <button disabled={isSubmit} type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}








