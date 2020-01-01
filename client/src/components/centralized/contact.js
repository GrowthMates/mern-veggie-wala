import React,{Component} from 'react';
import images from './images/images.jpg'
import './contact.css'




export default class Contact extends Component{


    render(){
        return(
            <div>
                 <div className='contact-body' >

                <section className='contact-upper col-lg-12' >
                <div className='contact-img-text'>
                    <h1>Contact Us </h1>
                    {/* <p>A Real Estate Organization You Can Trust</p> */}
                </div>
               </section>

                <section className='sec-2' >
                    <div class='container' >
                        <div class='row' >
                            <div class="col-sm-12 col-lg-6  ">
                                <h5>Keep in touch with us</h5><br/>
                                
                                <form>
                                      <div class="form-group">
                                        {/* <label for="name">Your Name</label> */}
                                        <input type="email" class="form-control" id="name" aria-describedby="emailHelp" placeholder="Name " />
                                    </div>
                                    <div class="form-group">
                                        {/* <label for="exampleInputEmail1">Email address</label> */}
                                        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="your email" />
                                    </div>
                                    <div class="form-group">
                                        {/* <label for="exampleInputPassword1">Phone Number</label> */}
                                        <input type="number" class="form-control" id="exampleInputPassword1" placeholder="Phone Number" />
                                    </div>
                                    <div class="form-group">
                                        {/* <label for="exampleInputPassword1">Subject</label> */}
                                        <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Subject" />
                                    </div>
                                    <div class="form-group">
                                        {/* <label fo r="exampleFormControlTextarea1">Your Message </label> */}
                                        <textarea placeholder='Message' class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                                    </div>
                                    <button type="submit" class="btn btn-info btn-lg btn-block">Submit</button>
                                </form>
                            </div>
                            
                            {/* 2nd column */}

                            <div class="col-sm-12 col-lg-6 contact-right">
                                <div className='sec-2-right' >
                                    <h5>For All Press Inquiries, <br/> Please Contact: </h5>
                                    <br/>
                                    <h5>shani khan </h5>
                                        <p>Public Relations Manager<br/> Address azzempura greentown 
                                        <br/>shani@gmail.com
                                        <br/> Contact No: 03121234567 </p>
                                    
                                        <br/>
                                         <h5>Arslan Khan </h5>
                                        <p>Public Relations Associated<br/> Address azzempura greentown 
                                        <br/>appscorrer@gmail.com
                                        <br/>Contact No: 03070084689</p>
                                </div>
                                <div className='sec-21-right' >
                                    <h5>Corporate Headquarter </h5>
                                    <p>chowk py raat 8 bajy ky head
                                        <br/> Headquarter open hi open
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            </div>
        )
    }
}