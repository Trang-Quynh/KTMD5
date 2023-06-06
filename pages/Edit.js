import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getOneProduct, updateOneProduct} from "../service/productService";
import * as Yup from "yup";


const SchemaError = Yup.object().shape({
    title: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    price: Yup.number()
        .required("Required"),
    description: Yup.string()
        .required("Required"),
});




export function Edit() {
    const navigate = useNavigate();
    let { id } = useParams();
    const dispatch = useDispatch()
    const [productFetched, setProductFetched] = useState(false)


    const currentProduct = useSelector(({products})=>{
        if(productFetched === true){
            console.log(products.currentProduct)
            return products.currentProduct;
        }
      return null
    })
    const categories = useSelector(({products})=>{
        return products.listCategory
    })
    useEffect(() => {
        dispatch(getOneProduct(id)).then(()=>{
            setProductFetched(true)
        });
    }, [id]);

    return (
        <>
            {currentProduct != null && currentProduct.id == id && categories && (
                <Formik
                    initialValues={{
                        id: currentProduct.id,
                        title: currentProduct.title,
                        price: currentProduct.price,
                        description: currentProduct.description,
                    }}
                    validationSchema={SchemaError}
                    onSubmit={(values) => {
                        dispatch(updateOneProduct(values)).then(() => {
                                navigate('/home/list');
                        });
                    }}
                >
                    {({values, setFieldValue}) => (
                        <Form>
                            <Field
                                type="text"
                                name="title"
                                value={values.title}
                                onChange={(e) => setFieldValue("title", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="title"/>
                            </p>
                            <Field
                                type="number"
                                name="price"
                                value={values.price}
                                onChange={(e) =>
                                    setFieldValue("price", e.target.value)
                                }
                            /><br/><br/>
                            <Field
                                type="text"
                                name="description"
                                value={values.description}
                                onChange={(e) =>
                                    setFieldValue("description", e.target.value)
                                }
                            /><br/><br/>



                            <button type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}

