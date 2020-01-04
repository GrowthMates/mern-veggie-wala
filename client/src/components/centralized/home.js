import React,{Component} from 'react';
import axios from 'axios'
import frt1 from './images/frt1.jpeg'
import frt2 from './images/frt2.jpeg'
import veg1 from './images/veg1.jpeg'
import veg2  from './images/veg2.jpeg'
import fresh from './images/fresh.webp'
import Center from './images/Center.webp'
import eco from './images/eco.webp'
import hearts from './images/hearts.webp'
import yammy from './images/yammy.webp'
import tasty from './images/tasty.webp'
import dlv from './images/dlv.webp'
import ser from './images/ser.webp'
import all from './images/all.webp'
import bana3 from './images/bana3.webp'
import kiwi3 from './images/kiwi3.webp'
import jack from './images/jack.webp'
import papa4 from './images/papa4.webp'
import love from './images/love.png'
import leaf from './images/leaf.png'
import heart1 from './images/heart.png'
import shoppingcart1 from './images/shopping-cart.png'
import search1 from './images/search.png'
import apple from './images/apple.jpg'
import low3 from './images/low3.webp'
import low2 from './images/low2.webp'
import low4 from './images/low4.jpg'
import plums from './images/plums.webp'
import pchs from './images/pchs.webp'
import cmbr from './images/cmbr.webp'
import mrtls from './images/mrtls.webp'
import spice from './images/spice.png'
import l1 from './images/l1.webp'
import l2 from './images/l2.webp'
import l3 from './images/l3.webp'
import l4 from './images/l4.webp'
import l5 from './images/l5.webp'
import l6 from './images/l6.webp'
import h1 from './images/h1.webp'
import h2 from './images/h2.webp'
import bgLower from './images/bgLower.webp'


// import premium from './images/premium.webp'

import './style/home.css'
import Axios from 'axios';


export default class Home extends Component{

    constructor(Props){
        super(Props);
        this.state={
            loader: true,
            products:''
        }
    }

    componentDidMount(){
            

        axios
        .get("http://localhost:5000/api/products")
        .then((res) => {
                        console.log("Products success", res.data)

                        localStorage.setItem('Products', JSON.stringify(res.data));
                        console.log('Products from Storage: ',localStorage.getItem('Products'));

                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );
    }


    render(){
        return(
            <div>
             
             <section  className='col-lg-12 homeImg'> 
             <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                    <ol class="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    </ol>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                         <img class="d-block w-100" src={h1} alt="First slide"/>
                        </div>
                        <div class="carousel-item">
                         <img class="d-block w-100" src={h2} alt="Second slide"/>
                        </div>
                        <div class="carousel-item">
                         <img class="d-block w-100" src={h1} alt="Third slide"/>
                        </div>
                    </div>
                    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="sr-only">Previous</span>
                    </a>
                    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="sr-only">Next</span>
                    </a>
                    </div>    
                    </section>    

                     {/* Home @nd Section */}
               <div className='container'>
                    <div className='row topProd' >
                        <div className='col-lg-3' >
                            <img  src={plums} width='270' hwight='289' />
                        </div>
                        <div className='col-lg-3' >
                          <img  src={pchs} width='270' hwight='289' />
                        </div>
                        <div className='col-lg-3' >
                          <img  src={cmbr} width='270' hwight='289' />
                        </div>
                        <div className='col-lg-3' >
                          <img  src={mrtls} width='270' hwight='289' />
                        </div>

                    </div>
               </div>

               <div className='homeMiddle'>
                  <img src={leaf} width='190' height='40' />
                   <h2 style={{color: '#5ba616'}}>We GrowBest Food</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8'}} > <i>It is a long established fact that a reader will be distracted by the readable</i></h6>
               </div>
                {/* our qualities  */}
               <div className='container threeMiddlw'>
                    <div className='row' >
                        <div className='col-lg-3 middleLeft' >
                            <img src={fresh} />
                            <h4>Fresh</h4>
                            <p>There are many a variations passages Ipsum available, a majority have</p>

                            <img src={hearts} />
                            <h4>Healthy</h4>
                            <p>There are many a variations passages Ipsum available, a majority have</p>

                            <img src={eco} />
                            <h4>Eco</h4>
                            <p>There are many a variations passages Ipsum available, a majority have</p>
                        </div>
                        <div className='col-lg-6' >
                            <img src={Center} height='380' />
                        </div>
                        <div className='col-lg-3 middleRight' >
                            <h4>Tasty</h4>
                            <img src={tasty} />
                            <p>There are many a variations passages Ipsum available, a majority have</p>
                            <h4>Yammu</h4>
                            <img src={yammy} />
                            <p>There are many a variations passages Ipsum available, a majority have</p>
                            <h4>Pemium</h4>
                            <img src={yammy} />
                            <p>There are many a variations passages Ipsum available, a majority have</p>
                        </div>
                    </div>
               </div>
                {/* our services */}
                <div className='container'>
                    <div className='row'>
                        <div className='col-lg-3 midLow ' >
                            <img src={dlv} width='56' height='42' />
                            <h4>Fast Delivery</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}}>Delivery wIthin 12 hour</p>
                        </div>
                        <div className='col-lg-3 midLow' >
                            <img  src={ser} width='49' height='42'/>
                            <h4>Best Services</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Support online 24/7</p>
                        </div>
                        <div className='col-lg-3 midLow' >
                            <img src={all} width='49' height='42' />
                            <h4>All-in-one</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Fruits&Vegetable</p>
                        </div>

                        <div className='col-lg-3 midLow' >                          
                 

                            <img src={love} width='49' height='42'/>
                            <h4>Made with Love</h4>
                            <p style={{color: '#949494',fontSize: '0.8em', opacity: '0.9'}} >Best Services</p>
                        
                    </div>
                </div>
                {/* topsale */}

                <div className='container' style={{marginTop: '25px'}} >
                    <div className='row '>
                        <div className='col-lg-3 p1' >
                           {/* <div className='topInner'>
                                <p>-57%</p>
                            </div> */}
                            <img src={bana3} width='270' height='270' />
                            <div className='lowerProd' >
                           
                                <img src={shoppingcart1} width='25' height='25' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5  >Banana</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$20</h5>
                        </div>
                        <div className='col-lg-3 p2' >
                            <img src={jack} width='270' height='270' /> 
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5 >JackFruits</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$40</h5>

                        </div>
                        <div className='col-lg-3 p3' >
                            {/* <div className='topInner'>
                                <p>-27%</p>
                            </div> */}
                            <img src={kiwi3} width='270' height='270' />
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>

                            <h5 >Kiwi</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$80</h5>
                        </div>
                        <div className='col-lg-3 p4' >
                            <img src={papa4} width='270' height='270' />
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5 >Papaya </h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$220</h5>
                        </div>
                    </div>
                </div>

                {/* product lower 2nd */}
                <div className='container' style={{marginTop: '30px'}} >
                    <div className='row '>
                        <div className='col-lg-3 p1' >
                            <img src={apple} width='270' height='270' />
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='25' height='25' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5  >Banana</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$20</h5>
                        </div>
                        <div className='col-lg-3 p2' >
                            <img src={low2} width='270' height='270' /> 
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5 >JackFruits</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$40</h5>

                        </div>
                        <div className='col-lg-3 p3' >
                            <img src={low3} width='270' height='270' />
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>

                            <h5 >Kiwi</h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$80</h5>
                        </div>
                        <div className='col-lg-3 p4' >
                            <img src={low4} width='270' height='270' />
                            <div className='lowerProd' >
                                <img src={shoppingcart1} width='23' height='23' />
                                <img src={heart1} width='23' height='23' />
                                <img src={search1} width='23' height='23' />                                
                            </div>
                            <h5 >Papaya </h5>
                            <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >$220</h5>
                        </div>
                    </div>
                </div>
                    {/* 4th section */}
                {/* <div className='container scndLower' >
                <div className='row' >
                    <div className='col-lg-4'>
                        <p style={{marginBottom: '0px'}}>NATURE DEAL OF THE DAY</p>
                        <h2 style={{fontWeight: '300'}}>Organic Goods <span style={{fontWeight: '600'}}> 50%  </span> Off</h2>
                    </div>
                    <div className='col-lg-4'>
                       <img src={spice} />
                       <hr style={{border: '1px solid #5ba616',width: '180'}} />
                       <br/>
                       <p>Expired</p>
                    </div>
                    <div className='col-lg-4'>
                       <p>Who are Ipsum is simply dummy text of the printing and indus try. Lorem Ipsum has been the stry's standard dummy text ever since the</p>
                    </div>
                </div>
                </div> */}

                <div className='homeMiddle'>
                  <img src={leaf} width='190' height='40' />
                   <h2 style={{color: '#5ba616'}}>Our Supplier</h2>
                   <h6  style={{color: '#949494',fontSize: '0.8em', opacity: '0.8'}} > <i>We present our achievement and and awards</i></h6>
               </div>

               <div className='container' style={{marginTop: '40px', marginBottom: '130px'}}  >
                <div className='row' >
                    <div className='col-lg-2' >
                        <img src={l1} />
                    </div>
                    <div className='col-lg-2' >
                     <img src={l2} />
                    </div>
                    <div className='col-lg-2' >
                     <img src={l3} />
                    </div>
                    <div className='col-lg-2' >
                     <img src={l4} />
                    </div>
                    <div className='col-lg-2' >
                     <img src={l5} />
                    </div>
                    <div className='col-lg-2' >
                     <img src={l6} />
                    </div>
                </div>
               </div>
                    {/* News Feed */}
               {/* <div className='container'>
                   <div className='row'>
                       <div classname='col-lg-6'>    
                          <h1 style={{color: '#616161', fontWeight: '300'}}>Subscribe <span style={{color: '#616161', fontWeight: '600'}}  > Newsletter  </span> </h1>
                       </div>
                       <div classname='col-lg-6'>    
                            <form>
                               <input placeholder='Type to search' className='navInput' />
                               <button className='navBtn'>Search</button>
                           </form>
                       </div>
                   </div>
               </div> */}

            </div>
            </div>
        )
    }
}