import React,{Component} from 'react';
import Register from './register'
import Login from './login'




export default class Combined extends Component{


    render(){
        return(
            <div>
               <div className='container'>
                 <div className='row'>
                    <div className='col-lg-6'>
                        <Login />
                    
                    </div>
                    <div className='col-lg-6'>
                        <Register />
                    </div>
                 </div>
               </div>
            </div>
        )
    }
}