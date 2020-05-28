import { combineReducers } from "redux";
import authReducer from "./authReducer";
import AdminAuthReducer from "./AdminAuthReducer";
import errorReducer from "./errorReducer";
import productsReducer from "./productsReducer";
import cartReducer from './cartReducer'
import progressReducer from './progressReducer'
// import imageReducer from "./imageReducer";

export default combineReducers({
  auth: authReducer,
  AdminAuth: AdminAuthReducer,
  errors: errorReducer,
  products : productsReducer,
  cartReducer: cartReducer,
  progressBar: progressReducer
  // imageReducer: imageReducer
});