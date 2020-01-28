import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import productsReducer from "./productsReducer";
import cartReducer from './cartReducer'
import imageReducer from "./imageReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  products : productsReducer,
  cartReducer: cartReducer,
  imageReducer: imageReducer
});