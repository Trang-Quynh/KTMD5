import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../service/productService";

export function List() {
    // gui request
    const dispatch = useDispatch()
    // nhan du lieu gui ve
    const products = useSelector(({products})=>{
        return products.list
    })

    const navigate = useNavigate();
    const [isLoad, setIsLoad] = useState(true)

    useEffect(() => {
        dispatch(getProducts());
        setIsLoad(false);
    }, [])


    return (
        <>
            {isLoad ? <>Loading......</> :
                    <>
                        <table border={1} style={{ width: '300px', height: '100px' }}>
                            <tr>
                                <td style={{ textAlign: 'center' }}>Id</td>
                                <td style={{ textAlign: 'center' }}>Name</td>
                                <td style={{ textAlign: 'center' }}>Price</td>
                                <td style={{ textAlign: 'center' }}>Quantity</td>
                                <td style={{ textAlign: 'center' }}>Category</td>
                                <td colSpan={2} style={{ textAlign: 'center' }}>Action</td>
                            </tr>
                            {
                                products && products.map(item => (
                                    <tr key={item.id}>
                                        <td style={{ textAlign: 'center' }}>{item.id}</td>
                                        <td style={{ textAlign: 'center' }}>{item.name}</td>
                                        <td style={{ textAlign: 'center' }}>{item.price}</td>
                                        <td style={{ textAlign: 'center' }}>{item.quantity}</td>
                                        <td style={{ textAlign: 'center' }}>{item.category.name}</td>
                                        <td style={{ textAlign: 'center' }}><Link to={`/home/edit/${item.id}`}  style={{backgroundColor: '#007bff', color: '#fff', padding: '8px 16px',borderRadius: '4px',textDecoration: 'none', border: '1px solid #007bff' , margin: '5px 5px 5px 0px'}}>Edit</Link></td>
                                        <td style={{ textAlign: 'center' }}><button type='submit' onClick={()=>{dispatch(deleteProduct(item.id))}}>Delete</button></td>
                                    </tr>
                                ))
                            }
                        </table>
                    </>
            }
        </>
    )
}







