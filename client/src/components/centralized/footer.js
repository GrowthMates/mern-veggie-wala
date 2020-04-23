import React,{Component} from 'react';
import {Link,BrowserRouter} from 'react-router-dom'
import './footer.css'
import images from './images/images.jpg'
import VeggieLogo from "./images/VeggiewalaLogo.png"



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
            <div className="fullFooter">
            <footer>

                <section   className='upperBg' >    

                <div className="row" >
                 <div className="col-lg-3 col-sm-12 col-xs-12">
                     <img src={VeggieLogo} className='footerImg' /> 
                        
                     {/* <h6 >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</h6>
                  <div  className='location' >
                    <p><span> <i className="fa fa-map-marker"></i> </span>100 Highland Ave, California, US</p>
                    <p><span> <i className="fa fa-envelope"></i> </span>support@gmail.com</p>
                    <p><span> <i className="fa fa-phone "></i> </span>(+84)123 456 789</p>
                 </div>    */}
                 </div>
                 <div className="col-lg-3 col-sm-12 col-xs-12">
                     <h4 className="footerHeadings">Information</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link> About Our Shop  </Link>
                          <Link> Customer Care   </Link>
                          {/* <Link> Our Blogs  </Link> */}
                          <Link> New Products  </Link>
                          {/* <Link> Sexure Shipping  </Link> */}
                     
                        </div>
                     </BrowserRouter>
                 </div>
                 <div className="col-lg-3 col-xs-12 col-sm-12">
                 <h4 className="footerHeadings">Connect with us</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link ><i className="fa fa-facebook"> </i> Facebook </Link>
                          <Link><i className="fa fa-instagram"></i> Instagram   </Link>
                          {/* <Link> Information  </Link> */}
                          {/* <Link> Address  </Link>
                          <Link> Order History  </Link> */}
                     
                        </div>
                     </BrowserRouter>    
                 </div>
                 <div className="col-lg-3 col-ss-12 col-sm-12">
                 <h4 className="footerHeadings">Guide & helps</h4>
                     <BrowserRouter>
                        <div className='upperLink' >

                          <Link> Return & Order  </Link>
                          <Link> Help Center  </Link>
                          <Link> FAQ's   </Link>
                          {/* <Link> Return & Order </Link> */}
                     
                        </div>
                     </BrowserRouter>
                </div>
                </div>
                </section>


              

            </footer>

            {/* Lower Section */}
             <section className='footer-main' >
              <div className='container' > 
                <div className="row">
                    <div className="col-md-12 col-xs-12 col-sm-12">
                        <p className='footer-p' >Copyrights &copy; 2020 by <a href="https://digitallyin.com" target="_blank">Digitallyin.</a> All Rights Reserved.
                        {/* <span onClick={this.profile.bind(this)} style={{cursor: 'pointer'}}>  Designed & Developed by Mopfhs </span> */}
                        </p>
                    </div>

                    {/* <div className="col-md-4 col-xs-12 col-sm-12">
                        <p>Follow us
                        
                           <Link href="#" className="fa fa-facebook"></Link>
                           <Link href="#" className="fa fa-twitter"></Link>
                           <Link href="#" className="fa fa-google"></Link>
                           <Link href="#" className="fa fa-instagram"></Link>
                       
                        </p>
                    </div> */}
                </div>
             </div>
             </section> 
            </div>
        )
    }
}