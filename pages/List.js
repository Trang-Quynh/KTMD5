import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {deleteProduct, getProducts} from "../service/productService";
import Swal from "sweetalert2";


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


    const handleDelete = (id) =>{
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(deleteProduct(id))
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            }
        })
    }


    return (
        <>
            {isLoad ? (
                <>Loading......</>
            ) : (
                <>
                    <table
                        style={{ width: '300px', height: '100px' }}
                        className="table"
                    >
                        <thead>
                        <tr>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                Id
                            </th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                name
                            </th>
                            <th scope="col" style={{ textAlign: 'center' }}>
                                description
                            </th>

                            {products && products.images && (
                                <th scope="col" colSpan={products.images.length} style={{ textAlign: 'center' }}>
                                images
                                </th>)
                            }

                            <th scope="col" colSpan={2} style={{ textAlign: 'center' }}>
                                Action
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {products &&
                            products.map((item) => (
                                <tr key={item.id}>
                                    <td >{item.id}</td>
                                    <td > <Link
                                        to={`/home/detail/${item.id}`}
                                    >
                                        {item.name}
                                    </Link></td>
                                    <td >{item.description}</td>
                                    {item.images.map(image =>(
                                        <td ><img src={image.url} alt="" style={{width:40, height: 40}}/></td>
                                        ))}
                                    <td>
                                        <Link
                                            to={`/home/edit/${item.id}`}
                                            className={"btn btn-primary"}
                                        >
                                            Edit
                                        </Link>
                                    </td>
                                    <td>
                                        <button
                                            className={"btn btn-danger"}
                                            type="submit"
                                            onClick={() => {
                                                handleDelete(item.id);
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </>
    );
}







