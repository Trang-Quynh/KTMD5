import {applyMiddleware, createStore} from "redux";
import productReducer from "./products/productSlice";
import thunk from "redux-thunk";
import {configureStore} from "@reduxjs/toolkit";

// export const store = createStore(StudentReducer, applyMiddleware(thunk))
const store = configureStore({reducer:{products: productReducer}})
export default store;



// Sử dụng khi projetc có nhiều reducer
// const rootReducer = combineReducers({
//     products: studentReducer,
//     classes: classReducer
// });
//
// const store = configureStore({ reducer: rootReducer });
