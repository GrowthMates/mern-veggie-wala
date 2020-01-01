import React,{Component} from 'react';
import {Link,BrowserRouter} from 'react-router-dom'
import './footer.css'
import images from './images/images.jpg'



export default class Footer extends Component{

    constructor(props) {
        super(props);
        this.state = {}
    }

    profile = (e) => {
        // this.props.history.push('/about')
        window.location.href= 'https://github.com/AyyanNiazi/Real-Estate/'
        console.log(window.location)
    }
    render(){
        return(
            <div>
            <footer>

                <section   className='upperBg' >    

                <div class="row" >
                 <div class="col-lg-3 col-sm-12 col-xs-12">
                     <img src={images} width='95' height='50' className='footerImg' /> 
                        
                     <h6 >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h6>
                  <div  className='location' >
                    <p><span> <i class="fa fa-map-marker"></i> </span>100 Highland Ave, California, US</p>
                    <p><span> <i class="fa fa-envelope"></i> </span>support@gmail.com</p>
                    <p><span> <i class="fa fa-phone "></i> </span>(+84)123 456 789</p>
                 </div>   
                 </div>
                 <div class="col-lg-3 col-sm-12 col-xs-12">
                     <h4>Information</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link> About Our Shop  </Link>
                          <Link> Top seller   </Link>
                          {/* <Link> Our Blogs  </Link> */}
                          <Link> New Product  </Link>
                          <Link> Sexure Shipping  </Link>
                     
                        </div>
                     </BrowserRouter>
                 </div>
                 <div class="col-lg-3 col-xs-12 col-sm-12">
                 <h4>My Account</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link > My Accounts  </Link>
                          <Link> Discount   </Link>
                          {/* <Link> Information  </Link> */}
                          <Link> Address  </Link>
                          <Link> Order History  </Link>
                     
                        </div>
                     </BrowserRouter>    
                 </div>
                 <div class="col-lg-3 col-ss-12 col-sm-12">
                 <h4>Guide & helps</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link> Getting Started  </Link>
                          <Link> FAQ's   </Link>
                          <Link> Buying Guide  </Link>
                          <Link> Return & Order </Link>
                     
                        </div>
                     </BrowserRouter>
                </div>
                </div>
                </section>


              

            </footer>

            {/* Lower Section */}
             <section className='footer-main' >
              <div className='container' > 
                <div class="row">
                    <div class="col-md-8 col-xs-12 col-sm-12">
                        <p class='footer-p' >VeggieWala All Right Reserved |
                        <span onClick={this.profile.bind(this)} style={{cursor: 'pointer'}}>  Designed & Developed by Mopfhs </span></p>
                    </div>
                    <div class="col-md-4 col-xs-12 col-sm-12">
                        <p>Follow us
                        
                           <Link href="#" class="fa fa-facebook"></Link>
                           <Link href="#" class="fa fa-twitter"></Link>
                           <Link href="#" class="fa fa-google"></Link>
                           <Link href="#" class="fa fa-instagram"></Link>
                       
                        </p>
                    </div>
                </div>
             </div>
             </section> 
            </div>
        )
    }
}