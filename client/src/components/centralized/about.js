import React,{Component} from 'react';
import {Link} from 'react-router-dom'
import './about.css'
import AboutImages from "./about-us-assets/images";
import male1 from './images/male1.jpeg'
import male2 from './images/male2.jpeg'
import female1 from './images/female1.jpeg'
import female2 from './images/female2.jpeg'


export default class About extends Component{


    render(){
        return(
            <div>
                 <section className='about-upper col-lg-12' >
                <div className='about-img-text'>
                    {/* <h1>ABOUT Veggie Walas </h1>
                    <p>A fruits and vegetables Organization You Can Trust</p> */}
                </div>
               </section>

               {/* 2nd section */}
            <main className='container-fluid' style={{    paddingBottom: '100px'}}> 
              
               <section className=' sec-2' >

                   <div id='abt-top-section'>
                    <div id='water-melon-left'><img src={AboutImages.waterMelon}  style={{width:'60%'}}/></div>
                    <div className='container'>

                    <div className='row'  style={{margin:'0 120px'}}>
                        
                        <div className='col-lg-12 col-xs-12 col-md-12 col-sm-12' >
                            <h2 className='who-we-are'>Who We Are ?</h2>
                            <p>Houzez is a premium WordPress theme for fruits and vegetables agents where modern 
                                aesthetics are combined with tasteful simplicity
                                and where the ease of use is achieved without compromise in your ability to customize the design.</p><br/>
                            <p>Unlike many other fruits and vegetables themes which confine you to a handful of 
                                predefined layouts, Houzez offers a limitless array of possibilities to structure and style your content. </p>
                        </div>
                    </div>
                    </div>
                   </div>



                   <div id='abt-mid-section' className='container'>

                   <div className='meet' ><h3 className='who-we-are'> Meet Our team  </h3></div>

                   {/* 3rd */}
                    <div className='team-top row' > 
                   <div className='col-lg-3 col-xs-12 col-md-3 col-sm-4 ' >

                   <div class="card" style={{width:'auto'}}>
                    <img class="card-img-top" src={AboutImages.person1} alt="Card image" style={{width:"100%",maxHeight: '359.77px'}}/>
                    <div class="card-body">
                    <h4 class="card-title">Saira Khan</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                    {/* <a href="#" class="btn btn-primary">See Profile</a> */}
                    <Link style={{color: '#1ebbd7'  }} > <button className='btn-view-profile'>View  Profile</button> </Link>
                    </div>
                    </div>

                      
                        
                   </div>
                   <div className='col-lg-3 col-xs-12 col-md-3 col-sm-4' >

                   <div class="card" style={{width:'auto'}}>
                    <img class="card-img-top" src={AboutImages.person2} alt="Card image" style={{width:"100%",maxHeight: '359.77px'}}/>
                    <div class="card-body" style={{textAlign:'center'}}>
                    <h4 class="card-title">M. Azeem Khan</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                    <Link style={{color: '#1ebbd7'  }} > <button className='btn-view-profile'>View  Profile</button> </Link>
                    </div>
                    </div>
                       
                        
                   </div>
                   <div className='col-lg-3 col-xs-12 col-md-6 col-sm-4' >

                   <div class="card" style={{width:'auto'}}>
                    <img class="card-img-top" src={AboutImages.person3} alt="Card image" style={{width:"100%",maxHeight: '359.77px'}}/>
                    <div class="card-body">
                    <h4 class="card-title">M. Salman Khan</h4>
                    <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                    <Link style={{color: '#1ebbd7'  }} > <button className='btn-view-profile'>View  Profile</button> </Link>
                    </div>
                    </div>

                        
                        
                   </div>
                   <div className='col-lg-3 col-xs-12 col-md-4 col-sm-4' >

                    <div class="card" style={{width:'auto'}}>
                        <img class="card-img-top" src={AboutImages.person4} alt="Card image" style={{width:"100%",maxHeight: '359.77px'}}/>
                        <div class="card-body">
                            <h4 class="card-title">Shumaila Khan</h4>
                            <p class="card-text">Some example text some example text. John Doe is an architect and engineer</p>
                            <Link style={{color: '#1ebbd7'  }} > <button className='btn-view-profile'>View  Profile</button> </Link>
                        </div>
                    </div>

                        
                        
                   </div>
                   </div>
                   </div>
               </section>


               
               <section className='sec-3 ' style={{position:'relative'}}>
                    <div className='container'>
                    <div className='succes'>
                        <h3 className='who-we-are' > Veggie Wala Was Built With Your Success In Mind </h3><br/>
                        <p>Get more calls schedules more viewing and earn more commission</p>
                    </div>

                    </div>

                    {/* 2nd */}
                      <div className='container'>
                    <div className='row abt-lower-desc' style={{justifyContent:'center'}} > 

                    {/* Lower Text Portion */}

                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                          <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>
                        <div className='col-lg-4 col-xs-12 col-md-4 col-sm-12' >
                        <div className='abt-lower-desc-body'>
                            <h5>Easy to Get Started</h5><br/>
                            <p>Do you like the demo? Import the provided sample 
                                content in a few clicks and start editing it right away</p><br/>
                          </div>
                        </div>

                      </div>
                        <div id='abt-pine-apple'>
                            <img src={AboutImages.pineApple} style={{width:'100%'}}/>
                        </div>
                    </div>


               </section>
               </main>
            </div>
        )
    }
}