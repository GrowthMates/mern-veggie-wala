import {
    PROGRESS_START,
    PROGRESS_END,
    
  } from "../actions/types";

  const initialState = {

    loading: false,

  };
  export default function(state = initialState, action) {
   
    switch (action.type) {
      case PROGRESS_START:
        return {
            ...state,
            loading: true,
          };        
        
        case PROGRESS_END:
        return {
          ...state,
          loading: false,
        };
      default:
        return state;
    }
  }