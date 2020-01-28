import { ADD_IMAGE, GET_IMAGES, GET_ERRORS } from "./types";
import history from "../history";
import axios from 'axios'
   //ADD IMAGE
    export const addImage = imageData => dispatch => {
      console.log('ImageData====1',imageData)
    axios.post("http://localhost:5000/add", imageData).then((res) => 
    {
       console.log('ImageData====2',res.data)
      history.push("/AllImages");
         dispatch({
    type: ADD_IMAGE,
    payload: res.data
    })}).catch(err =>
      {console.log('image catch err===',err.message)
          dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    })});
    };
    //GET ALL IMAGES
    export const getAllImages = () => dispatch => {
    axios.get("http://localhost:5000/viewImages").then(res => dispatch({
       
    type: GET_IMAGES,
    payload: res.data
    })).catch(err => dispatch({
    type: GET_IMAGES,
    payload: null
       }));
    };