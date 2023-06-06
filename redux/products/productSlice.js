import {createSlice} from "@reduxjs/toolkit";
import {
    addProduct,
    deleteProduct,
    getOneProduct, getSearchProducts,
    getProducts,
    updateOneProduct, getCategories
} from "../../service/productService";

const initialState = {
    list: [],
    listCategory: [],
    listSearch: [],
    currentProduct: null
}

const productSlice = createSlice(
    {
        name: 'Product',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(getProducts.fulfilled, (currentState, action)=>{
                     currentState.list = action.payload
            })
            builder.addCase(getCategories.fulfilled, (currentState, action)=>{
                currentState.listCategory = action.payload
            })
            builder.addCase(addProduct.fulfilled, (currentState, action)=>{
                currentState.list.push(action.payload)
            })
            builder.addCase(deleteProduct.fulfilled, (currentState, action)=>{
                    let id = action.payload;
                    let index = -1;
                    for (let i = 0; i < currentState.list.length; i++) {
                        if(currentState.list[i].id === id){
                            index = i;
                        }
                    }
                    currentState.list.splice(index, 1)
            })
            builder.addCase(getOneProduct.fulfilled, (currentState, action)=>{
                console.log(action.payload)
                currentState.currentProduct = action.payload;
            })

            builder.addCase(updateOneProduct.fulfilled, (currentState, action) =>{
                  let Product = action.payload;
                  let id = Product.id;
                  let index = -1;
                  for (let i = 0; i < currentState.list.length; i++) {
                      if(currentState.list[i].id === id){
                          index = i;
                      }
                  }
                  currentState.list[index] = Product;
            })
            builder.addCase(getSearchProducts.fulfilled, (currentState, action)=>{
                currentState.listSearch = action.payload;
            })

        }
    }
)
export default productSlice.reducer