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
            <Header/>
            <Outlet/>
            <Footer/>
        </>
    )
}


