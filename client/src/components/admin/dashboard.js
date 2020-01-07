import React,{Component} from 'react';

import axios from 'axios';


export default class Admin extends Component{



    componentDidMount(){
        axios.get('http://localhost:5000/api/get-stock')
        .then((res)=>{
            console.log('Stock response',res.data);
        })
        .catch(err=>{
            console.log('Stock err',err.message)
        })
    }

    render(){
        return(
            <div>
                <h1>Admin</h1>  
            </div>
        )
    }
}