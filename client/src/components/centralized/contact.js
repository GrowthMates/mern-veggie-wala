import React,{Component} from 'react';
import './contact.css'
import ContactUsImages from "./contact-us-assets/images";




export default class Contact extends Component{


    render(){
        return(
            <div>
                 <div className='contact-body' >

                <section className='contact-upper col-lg-12' >
                <div className='contact-img-text'>
                    
                    {/* <p>A Real Estate Organization You Can Trust</p> */}
                </div>
               </section>

                <section className='sec-2' >
                    <div class='container' >
                        <h3 className='For-Further-Inquiries'>For Further Inquiries</h3>
                        <div className='row contact-mid-top'>
                            <div className='col-lg-5 col-md-5 col-xs-5'>
                                <img src={ContactUsImages.locationIcon} style={{width: '6%'}} alt='location-icon'/>
                                <p style={{paddingTop:'1em'}}> B-303, Blossom Trade Center, University Road Karachi.</p>
                            </div>
                            <div className='col-lg-4 col-md-4 col-xs-4' style={{textAlign:'center'}} >
                                <img src={ContactUsImages.phoneIcon} style={{width: '10%'}} alt='Phone-icon'/>
                                <p style={{paddingTop:'1.5em'}}> (021) 341 650 49 , 92 300 219 1878</p>
                            </div>
                            <div className='col-lg-3 col-md-3 col-xs-3'>
                                <img src={ContactUsImages.mailIcon} style={{width: '12%'}} alt='Mail-icon'/>
                                <p style={{paddingTop:'2em'}}>info@veggiewala.com</p>
                            </div>

                        </div>
                        <div class='row' >
                            <div class="col-sm-12 col-lg-12  contact-us-form">
                              
                                
                                <form>
                                    <div className='row'>

                                      <div className='col-sm-3 col-lg-3'>
                                        <label for="name">Your Name</label>
                                        <input type="email" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Name " />
                                    </div>
                                    <div className='col-sm-3 col-lg-3' >
                                        <label for="exampleInputEmail1">Email address</label>
                                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="your email" />
                                    </div>
                                    <div className='col-sm-3 col-lg-3' >
                                        <label for="exampleInputPassword1">Phone Number</label>
                                        <input type="number" className="form-control" id="exampleInputPassword1" placeholder="Phone Number" />
                                    </div>
                                    <div className='col-sm-3 col-lg-3' >
                                        <label for="exampleInputPassword1">Subject</label>
                                        <input type="text" className="form-control" id="exampleInputPassword1" placeholder="Subject" />
                                    </div>
                                    </div>
                                    <div className='' >
                                        <label fo r="exampleFormControlTextarea1">Your Message </label>
                                        <textarea placeholder='Message' className="form-control" id="exampleFormControlTextarea1" rows="10"></textarea>
                                    </div>
                                    <button type="submit" className="contact-us-send-btn">Submit</button>
                                </form>
                            </div>
                            
                            

                            
                        </div>
                    </div>
                </section>
            </div>
            </div>
        )
    }
}