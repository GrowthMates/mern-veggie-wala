import React from 'react';
import "./style/home.css"
import {Link} from "react-router-dom"
import { Transformation, Image } from "cloudinary-react";
import Rating from '@material-ui/lab/Rating';



const ProductCards = ({item}) =>{
    const starRating = item.starRating?.length>0?Math.round(item.starRating.reduce((a,b)=>a+b)/item.starRating.length):0;
    return(

        


        <div key={item._id} className="card p1" style={{width: '14rem',marginBottom:'10%'}} >
            <div style={{maxHeight:'13rem',overflow:'hidden'}}>
            <Link to = {`/product/${item._id}`}>
                {/* <img className="card-img-top" src={item.images[0].image} alt="Card image cap" style={{height:'13rem'}} /> */}
                <Image publicId={item.images[0].imageId}>
                                                    <Transformation
                                                        crop="scale"
                                                        width="280"
                                                        height="222"
                                                        dpr="auto"
                                                        responsive_placeholder="blank"
                                                    />
                                                </Image>
                </Link>
            </div>
            <div className="card-body">
            <div className='row card-item-name'>
                 <div className="col-7">
                <Link   style={{textDecoration:'none', color:'black'}} to = {`/product/${item._id}`} > <h5 style={{textAlign:'left'}}>{item.name}</h5></Link>
                <h5 style={{textAlign: 'left', marginBottom: '10px'}} >Rs.{item.price}</h5>
                 </div>
                 <div className="col-5">
                <h5 style={{textAlign:'right', width:'100%'}}>1(Kg)</h5>
                <div style={{marginTop:'5px'}}> 
                       <Rating name="read-only small-size" value={starRating} size='small' style={{fontSize:'0.9rem'}} readOnly />
                </div>
                 </div>
                 </div> 
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
            </div>
            </div>

    )
}

export default ProductCards;
