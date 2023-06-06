import axios from "axios";
import {createAsyncThunk} from "@reduxjs/toolkit";


export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () =>{
        let response = await axios.get('http://localhost:3001/products');
        return response.data
    }
);
export const getCategories = createAsyncThunk(
    'category/getCategories',
    async () =>{
        let response = await axios.get('http://localhost:3001/categories');
        return response.data
    }
);


export const getSearchProducts = createAsyncThunk(
    'products/getSearchProducts',
    async (keyword) =>{
        console.log(keyword)
        let response = await axios.get(`http://localhost:3001/products/search?search=${keyword}`);
        console.log(response.data)
        return response.data
    }
)




export const addProduct = createAsyncThunk(
    'products/addProduct',
    async (values) =>{
        await axios.post('http://localhost:3001/products', values);
        return values;
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) =>{
        console.log(id, 1234)
        let response = await axios.delete(`http://localhost:3001/products/${id}`)
        return response.data.id;
    }
)


export const getOneProduct = createAsyncThunk(
    'products/getProduct',
    async (id) =>{
        let response = await axios.get(`http://localhost:3001/products/getOne/${id}`)
        return response.data
    }
)

export const updateOneProduct = createAsyncThunk(
    'products/updateProduct',
    async (values) =>{
        let response = await axios.put(`http://localhost:3001/products/${values.id}`, values)
        return response.data

    }
)







