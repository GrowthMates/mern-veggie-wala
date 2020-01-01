import React,{Component} from 'react';
import './collections.css'
import ImageAppla from '../centralized/images/apple.jpg' 
import ImageIconList from '../centralized/images/list-icon.png' 
import ImageIconGrid from '../centralized/images/grid-icon.png' 




export default class Collections extends Component{
    constructor(Props){
        super(Props);
        this.state={
            veiwOption:false
        }
    }
    changer1=()=>{
        console.log('working')
        this.setState({
            veiwOption:false
        })
    }
    changer2=()=>{
        console.log('working 2')
        this.setState({
            veiwOption:true
        })

    }


    render(){
        return(
            <div>
                 <section className='contact-upper col-lg-12' >
                    <div className='contact-img-text'>
                        <h1>Our Products </h1>
                        {/* <p>A Real Estate Organization You Can Trust</p> */}
                    </div>
               </section>

            <div className="container div-items">
                <div className="row custom-row">
                    <div className="col-md-2 col-lg-2 col-sm-2 side-bar">
                       <div className="side-bar-section"> 
                            <h4>Categories</h4>
                                <ul className="side-list">
                                    <li class="side-list-items cursor-pointer">Fruits</li><hr/>
                                    <li class="side-list-items cursor-pointer">Vegetables</li><hr/>
                                    <li class="side-list-items cursor-pointer">Fresh Items</li><hr/>
                                </ul>
                        </div>
                       
                        <div className="side-bar-section"> 
                            <h4>Brand</h4>
                                <ul className="side-list">
                                    <li class="side-list-items cursor-pointer">Example Brand</li><hr/>
                                    <li class="side-list-items cursor-pointer">Gfruits-Store-Demo</li><hr/>
                                </ul>   
                        </div>

                        <div className="side-bar-section"> 
                            <h4>Product-Filter</h4>
                                <ul className="side-list">
                                    <li class="side-list-items cursor-pointer">Fruits</li><hr/>
                                    <li class="side-list-items cursor-pointer">Vegetables</li><hr/>
                                    <li class="side-list-items cursor-pointer">Fresh Items</li><hr/>
                                </ul>
                        </div>

                   </div>


                    <div className="col-md-9 col-lg-9 col-sm-9 mainRight">
                                   
                        <div className="container">
                        
                            <div className="row row-col-2">
                                <div className="col-lg-12 col-md-12 item-view-sort">
                                    <div className="col-lg-5 col-md-5 item-view">
                                    {/* <i class="fas fa-list icon1"></i> */}
                                    <img 
                                    className="cursor-pointer" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageIconList} 
                                    onClick={this.changer1}
                                    
                                    width="40px" height="40px"/>
                                    <img 
                                    className="cursor-pointer" 
                                    style={{marginRight:'25px'}} 
                                    src={ImageIconGrid} 
                                    width="35px" height="35px"
                                    onClick={this.changer2}
                                    />
                                    <span className="">Showing 1 - 12 of 16 results</span>
                                    </div>
                                    <div className="col-lg-6 col-md-6 item-sort">
                                        <div class="dropdown">
                                            <button class="btn  dropdown-toggle drop-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Alphabetically, A-Z
                                            </button>
                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a class="dropdown-item" href="#">Action</a>
                                                <a class="dropdown-item" href="#">Another action</a>
                                                <a class="dropdown-item" href="#">Something else here</a>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>

                        {(this.state.veiwOption === false)?(
                            <div>
                                    <div className='container team' >
                                            <div className='col-lg-4 prodImg'>
                                                <img className="cursor-pointer" src={ImageAppla} width='250' height='250' />
                                            </div>
                                            <div className="col-md-8 col-lg-8 data">
                                                <h6 className="item-name cursor-pointer">Apple</h6>
                                                <h6 className="stretch">From $60</h6><br/>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. luctus ligula ac faucibu</p><br/>
                                                <button type="button" class="btn btn-success btn-lg cart-btn">Add to cart</button>
                                            </div>
                    
                                    </div>

                           {/* 2nd */}


                            <div className='container team' >
                                            <div className='col-md-4 col-lg-4 prodImg'>
                                            <img src={ImageAppla} width='250' height='250' />
                                            </div>
                                            <div className="col-md-8 col-lg-8 data">
                                            <h6 style={{color: '#1ebbd7', paddingTop: '30px'}}>M, Azeem khan</h6>
                                            <h6>Founder & CEO , Veggie Walas fruits and vegetables</h6><br/>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. luctus ligula ac faucibu</p><br/>
                                        
                                            </div>
                    
                            </div> 
                    </div>         

                        ):
                   (
                        <div className="container">
                            
                                 <div className="row row-col-3">  
                                   <div className="col-md-4 col-lg-4 col-sm-4"> 
                                    <div class="card grid-view grid-card-styling" style={{width: '18rem',textAlign:'left'}}>
                                        <img className="card-img-top cursor-pointer img-grid" src={ImageAppla} alt="..."/>
                                            <div class="card-body" style={{paddingTop:'0px'}}>
                                                <h5 class="card-title cursor-pointer" style={{fontSize:'30px'}}>Apple</h5>
                                                <p class="card-text">From $60</p>
                                                <button className="btn btn-success">Add to cart</button>
                                            </div>
                                    </div>
                                   </div> 

                                    {/* 2nd */}

                                    <div className="col-md-4 col-lg-4 col-sm-4"> 
                                    <div class="card grid-view grid-card-styling" style={{width: '18rem'}}>
                                        <img className="card-img-top cursor-pointer img-grid" src={ImageAppla} alt="..."/>
                                            <div class="card-body" style={{paddingTop:'0px',textAlign:'left'}}>
                                                <h5 class="card-title cursor-pointer" style={{fontSize:'30px'}}>Apple</h5>
                                                <p class="card-text">From $60</p>
                                                <button className="btn btn-success">Add to cart</button>
                                            </div>
                                    </div>
                                   </div> 

                                   {/* 3rd */}

                                   <div className="col-md-3 col-lg-4 col-sm-4"> 
                                    <div class="card grid-view  grid-card-styling" style={{width: '18rem',textAlign:'left'}}>
                                        <img className="card-img-top cursor-pointer img-grid" src={ImageAppla} alt="..."/>
                                            <div class="card-body" style={{paddingTop:'0px'}}>
                                                <h5 class="card-title cursor-pointer" style={{fontSize:'30px'}}>Apple</h5>
                                                <p class="card-text">From $60</p>
                                                <button className="btn btn-success">Add to cart</button>
                                            </div>
                                    </div>
                                   </div> 

                                </div>    

                         </div>)
                   }
                   

                   
                                      
                    </div>

                </div>
            </div>

            </div>  
        )
    }

}