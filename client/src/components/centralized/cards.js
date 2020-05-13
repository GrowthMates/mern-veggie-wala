import React from 'react';
import "./style/home.css"
import {Link} from "react-router-dom"



const ProductCards = ({item}) =>{
    return(

        <div className='p1'>
            <Link to = {`/product/${item._id}`} >
                <div className="home-item-imageBx">
                <img src={item.image[0]}  style={{width:'100%',height:'14rem'}} alt=''/>
                </div>
                </Link>
             <div className='row card-item-name'>
                 <div className="col-6">
                <Link   style={{textDecoration:'none', color:'black'}} to = {`/product/${item._id}`} > <h5 >{item.name}</h5></Link>
                <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs.{item.price}</h5>
                 </div>
                 <div className="col-6">
                <h5 style={{textAlign:'right', width:'100%'}} className="col-6">1(Kg)</h5>
                <div><i>*****</i></div>
                 </div>
                 </div>   
        </div>

    )
}

export default ProductCards;
