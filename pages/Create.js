import {Form, Formik, Field, ErrorMessage} from "formik";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import {addProduct, getCategories} from "../service/productService";
import {useEffect} from "react";

const SchemaError = Yup.object().shape({
    name: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    category: Yup.number()
        .required("Required")
});


export function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const categories = useSelector(({products})=>{

        return products.listCategory
    })


    useEffect(() => {
        dispatch(getCategories());
    }, [])

    return (
        <Formik
            initialValues={{
                name: '',
                price: '',
                quantity: '',
                category: ''
            }}
            validationSchema={SchemaError}
            onSubmit={(values) => {
                console.log(values)
                dispatch(addProduct(values)).then(() => {navigate('/home/list')})
            }}
        >
            <Form>
                <Field type="text" name="name" placeholder="Name" />
                <p style={{ color: 'red' }}><ErrorMessage name="name" /></p>
                <Field type="number" name="price" placeholder="price" /><br/>
                <Field type="number" name="quantity" placeholder="quantity" /><br/>
                <Field as="select" name="category" placeholder="category">
                    <option value="-1">Select a category</option>
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </Field>
                <p style={{ color: 'red' }}><ErrorMessage name="category" /></p>




                <button type='submit'>Add</button>
            </Form>
        </Formik>
    );
}