import {ErrorMessage, Field, Form, Formik} from "formik";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {addProduct, getCategories, getOneProduct, updateOneProduct} from "../service/productService";
import * as Yup from "yup";
import {logDOM} from "@testing-library/react";

const SchemaError = Yup.object().shape({
    // id: Yup.number()
    //     .min(2, "Too Short!")
    //     .required("Required"),
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    // description: Yup.string()
    //     .min(2, "Quá ngắn")
    //     .required("Required")
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
    useEffect(() => {
        dispatch(getCategories());
    }, []);


    return (
        <>
            {currentProduct != null && currentProduct.id == id && categories && (
                <Formik
                    initialValues={{
                        id: currentProduct.id,
                        name: currentProduct.name,
                        price: currentProduct.price,
                        quantity: currentProduct.quantity,
                        category:currentProduct.category
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
                                name="name"
                                value={values.name}
                                onChange={(e) => setFieldValue("name", e.target.value)}
                            />
                            <p style={{color: "red"}}>
                                <ErrorMessage name="name"/>
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
                                type="number"
                                name="quantity"
                                value={values.quantity}
                                onChange={(e) =>
                                    setFieldValue("quantity", e.target.value)
                                }
                            /><br/><br/>
                            <Field as="select" name="category" placeholder="category">
                                <option value={values.category.id}>Category</option>

                                {categories.map((item) =>(
                                    <option value={item.id}>{item.name}</option>)
                                )}
                            </Field><br/>
                            <button type="submit">Edit</button>
                        </Form>
                    )}
                </Formik>
            )}
        </>
    );
}

