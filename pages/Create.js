import {Form, Formik, Field, ErrorMessage} from "formik";
import {useNavigate} from 'react-router-dom';
import * as Yup from 'yup';
import {useDispatch} from "react-redux";
import {addProduct} from "../service/productService";

const SchemaError = Yup.object().shape({
    title: Yup.string()
        .min(2, "Quá ngắn")
        .required("Required"),
    price: Yup.number()
        .required("Required"),
    description: Yup.string()
        .required("Required"),
});


export function Create() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Formik
            initialValues={{
                title: '',
                price: '',
                description: '',
            }}
            validationSchema={SchemaError}
            onSubmit={(values) => {
                console.log(values)
                dispatch(addProduct(values)).then(() => {navigate('/home/list')})
            }}
        >
            <Form>
                <Field type="text" name="title" placeholder="title" />
                <p style={{ color: 'red' }}><ErrorMessage name="title" /></p>
                <Field type="number" name="price" placeholder="price" /><br/>
                <p style={{ color: 'red' }}><ErrorMessage name="price" /></p>
                <Field type="text" name="description" placeholder="description" /><br/>
                <p style={{ color: 'red' }}><ErrorMessage name="description" /></p>
                <button type='submit' className={"btn btn-primary"}>Add</button>
            </Form>
        </Formik>
    );
}