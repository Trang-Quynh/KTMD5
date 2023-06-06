
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {getOneProduct} from "../service/productService";






export function Detail() {
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


    useEffect(() => {
        dispatch(getOneProduct(id)).then(()=>{
            setProductFetched(true)
        });
    }, [id]);

    return (
        <>
            {currentProduct != null && currentProduct.id == id && (
                <>
                    <p>Name: {currentProduct.title}</p><br/>
                    <p>Price: {currentProduct.price}</p><br/>
                    <p>Description: {currentProduct.description}</p><br/>

                </>
                )}
        </>
    );
}