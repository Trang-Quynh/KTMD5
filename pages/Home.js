import {Footer} from "../components/Footer";
import {Header} from "../components/Header";
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {ErrorMessage, Field, Form, Formik} from "formik";
import {addProduct, getSearchProducts} from "../service/productService";
import {useDispatch} from "react-redux";

export function Home() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return (
        <>
            <Header/><br/>
            <Formik
                initialValues={{
                    search: '',
                }}>
                {({values, setFieldValue}) => (
                    <Form>
                        <Field
                            type="text"
                            name={'search'}
                            placeholder={'Search...'}
                            onChange={(event) => {
                                const {value} = event.target;
                                setFieldValue('search', value);
                            }}
                        />
                        <Link to={`/home/search?keyword=${values.search}`}>
                            <button type='submit'>Find</button>
                        </Link>
                    </Form>
                )}
            </Formik>
            <br/>
            <Outlet/>
            <Footer/>
        </>
    )
}


