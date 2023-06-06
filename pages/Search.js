import {useEffect, useState} from "react";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getSearchProducts} from "../service/productService";

export function Search() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    let keyword = searchParams.get('keyword')
    const products = useSelector(({products})=>{
        return products.listSearch
    })
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        dispatch(getSearchProducts(keyword));
        setIsLoad(false);
    }, [keyword])

    return (
        <>
            {isLoad ? <>Loading......</> :
                <>
                    <table border={1}>
                        <tr>
                            <td>Id</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Quantity</td>
                            <td colSpan={2}>Category</td>
                        </tr>
                        {
                            products && products.map(item => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.price}</td>
                                    <td>{item.quantity}</td>
                                    <td>{item.category.name}</td>
                                    <td><Link to={`/home/edit/${item.id}`}>Edit</Link></td>
                                    <td><button type='submit' onClick={()=>{dispatch(deleteProduct(item.id)).then(() => {
                                        navigate('/home/list');
                                    });}}>Delete</button></td>
                                </tr>
                            ))
                        }
                    </table>
                </>
            }
        </>
    )
}
