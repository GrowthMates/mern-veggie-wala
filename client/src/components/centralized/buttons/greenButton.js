import React from 'react';
import {withRouter} from 'react-router-dom'
import './greenButton.css'



const greenButton=(props) =>{
    console.log(props) 
    return(
        <div className='greenBtn'>
            <button className=' btn btn-success btn-lg' onClick={()=>{
                if(props.redirectPath){
                    props.history.push(props.redirectPath)
                }
            }}>
                {props.buttonText}</button>
        </div>
    );
};

export default withRouter(greenButton);