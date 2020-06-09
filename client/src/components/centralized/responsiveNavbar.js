import React, {Component} from 'react'
import shoppingcart from './images/shopping-cart.png'
import './style/navbar.css';
import {Link,NavLink} from 'react-router-dom'
import VeggieLogo  from "../centralized/images/veggie-wala-logo-white.png";
import {logoutUser} from "../../actions/authActions"
import {connect} from "react-redux"

function myFunction(x) {
    x.classList.toggle("change");
  }

class ResponsiveNavbar extends Component{
    state={
        toggle:true,
        hamburgerInner:true,
        active:true,
        active1:false,
        
    }
    hamburger(){
        this.setState({
            toggle: false,
        })

        
    }

    close(){
        this.setState({
            toggle: true
        })
        console.log('cose sy')
    }

    menu(){
        this.setState({
            hamburgerInner: true,
            active1:false,
            active:true,
        })
    }

    login(){
        this.setState({
            hamburgerInner: false,
            active1:true,
            active:false
        })
    }

    render(){
        const vert_align = {
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top:'0',
            zIndex: '1000000'
        }

       
        return(

            <nav className="navbar navbar-expand-lg navbar-light responsiveNav" style={{backgroundColor:'#7ca646 !important'}}>
                    <Link className="navbar-brand" to="/"><img src={VeggieLogo} alt="veggie wala logo" style={{width:'27vw'}}/></Link>
                    {/* <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAECklEQVR4nO2aSWsUQRSAP8WMGVGJO4gn0YScFMGoKG6gItGLXgR/gR68GuLBQ8TtN0TE7eBVRcRdMO5Go6eISxQToo6iJmqIS3t4r53Fnpnq6Z6u6WQ+KKqnuqr6zetX71VVF1SpkgAOAX1AP3AYGGdVoog5CDhASpMDHLAqUcT0In+8TtNH4BOwzKZQUTE2T/kUoAM4CYyPThw7HEDM/qMmB7gBfNPr80CNNekiIIEooRf4gDjBBNCIOEUH2GVNOsusJ+0gay3LYo0uRAnrbQtSDvI5wUxuad5YTkFsYaKAPs1nlFMQW5go4IPmo1YBKc2nl1OQSmY14gRHUupFlgAJk0VPqniV2DEb2I0ooyiztOK7ckoUMStQSzDxAe70eCpmPiMOjNHcMRkCv4DPyALpd9lEssNx04rPsO+4wkxvgf3ImseIW9pwuWmDCmQb8h/OZBaajml3MhTnucASze9mFpoqIHcy1AHczKlT6WVNmt+nBA4h5tOiv92xlEkll9UA34E/yLbfP/xawDTD+pXGAiAJdCMR7R+m29+uAtwFUQf/a72Sy1zzv0eJbNYOz5XagWWOIfLvyL0xWqKAZwTwwzxEg89DESda6pAZ7A88drf9OsE4boo0If/zIfAz96apAr4Aw8Bk4vehpKD5myrAQVaFEL9Q6CrAMwL4Wd7GdWtsseaBLADiqYC5wEzgPdDjVaEUBcTJERYNf34UEMe5gDsDDEUBcRwCoVqAGwXiooAaYCESwR7kqzSSh0DeFWAmI3kIGM3/R3IUCLwAymUO6R3VONCNyLsorA5rtcMh/e1uOkSZMvf5vJ7v3q9Dtr++U+R8k58hMAQMIouhSRh+VwsZJ891blkT8vXnER4rwEz8nghNARMRR7jCZ9uwKfT8pZrfKdaJ3299cXCEU4Aten077M5PY/+zlml6g8wDCuLXAp76rG+DIeASsA7ZBgsVd2qZQhzhqOQhooRW24LYYgOigEHSuy1erAEuIJsRg8BVYFWA564GriFnmN3+NgXoLxDtiBL68T5A2aL3hxGL6dTrUi1nj7Z9pc9uR3Z4HGBfCf0FJom8DQd5IztJHztZi8zCHgPzM9rUI8du/yAOypRN2uYY2V49iZzwcLBkCUmyw+ILYC+imGGy/7xLg9476+M515E37xXSkoglXPHRX+hsB16SHYM7C9TvxH9Mby/QXzvwtVThwzj1dQox763AUeQNR8mY4lWi5SKihHqPew3I4sTPELiGmLnXEJhABQyBXDYiZttFthIagCf4d4LN2uY4/zvBE/qs5gDyloU20mGwE1mWumGwpUC7fLRq2x7giKbXWtYWXNzy0IxMVgaBAeAysDJAf6sQUx/QdIUKfPNVqlSJF38BO9zZOnIKWc0AAAAASUVORK5CYII="/> */}
                    {/* <img class="fa fa-cart-plus"></i> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/">Home <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/collections">Products <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/contact">Contact Us <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/about">About Us <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/cart">Cart <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/wishlist">Wishlist <span className="sr-only">(current)</span></NavLink>
                        </li>
                        {this.props.auth?.isAuthenticated ? 
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="" onClick={() => this.props.logoutUser()}>Logout <span className="sr-only">(current)</span></NavLink>
                        </li>
                        :
                        <React.Fragment>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/user/login">Sign In <span className="sr-only">(current)</span></NavLink>
                        </li>
                        <li className="nav-item ">
                        <NavLink exact className="nav-link" activeClassName='active' to="/user/sign-up">Sign Up <span className="sr-only">(current)</span></NavLink>
                        </li>
                        </React.Fragment>
                        }
                    
                    </ul>
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0 mob-nav-search-btn" type="submit">Search</button>
                    </form>
                    </div>
                </nav>

            // <div className='responsive'>
            //     <nav  className='sticky-top'  >
            //         <div className='grid-container' >
            //             <div  className='grid-item1'>
            //                 {this.state.toggle===true?
            //                 (
            //                     <div    onClick={this.hamburger.bind(this)} data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
            //                         <div className='bar1'></div>
            //                         <div className='bar2'></div>
            //                         <div className='bar3'></div>
            //                     </div>
            //                 )  :
            //                 (
            //                     <div  onClick={this.close.bind(this,)}
            //                      data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"> X</div>
            //                 )  
            //                  }
                            
                           
            //             </div>
            //             <div  className='grid-item2'>
            //             <Link to="/">
            //                 <img  src={VeggieLogo} className="img-fluid" alt='VeggieWala Logo'/>
            //             </Link>
            //             </div>
            //             <div  className='grid-item3'>
            //             <img className='cursor-pointer dropbtn' src={shoppingcart} width='30' height='30.52'/>
            //              <sup>1</sup>
            //             </div>
            //         </div>
            //     </nav>

            //     {/* Navbar hamburger after open */}
            //  <div className="row">
            //     <div className="col">
            //         <div className="collapse multi-collapse" id="multiCollapseExample2">
            //          <div className="card card-body responsiveNavMenuMain">
            //              {/* divider for top */}
            //                 <div className='hamburgerDivider'>
            //                     <div className={this.state.active ? 'linkActive  inner-item1' : 'notActive inner-item1'}  
            //                      onClick={this.menu.bind(this)}>
            //                             <div className='leftHamburger'>Menu</div>


            //                     </div>
                                    
            //                     <div  className={this.state.active1 ? 'linkActive  inner-item2' : 'notActive inner-item2'}
            //                       onClick={this.login.bind(this)}>
            //                             <div className='rightHamburger' style={{textAlign:'center'}}>Login</div>
            //                     </div>
            //              </div>

            //              {/* divider for top ends here */}

            //              <div style={{transition:'0.25s'}}>
                             
            //             {this.state.hamburgerInner===true?
            //             (

            //              <div className="responsiveNavMenu" >
            //                 <li><Link to='/'>Home</Link></li>
            //                 <li><Link to='/contact'>Contact Us</Link></li>
            //                 <li><Link to='/about'>About Us</Link></li>
            //                 <li><Link to='/collections' >Products</Link></li>
            //                 {/* <li><Link to='combined'>Sign In</Link></li> */}
            //                 <li><Link to='/cart'>Cart</Link></li>
                            
            //              </div>
            //             )
            //             :
            //             (
            //                 <div className="responsiveNavMenu">
            //                  <li><Link to='combined'>Sign In</Link></li>
            //                  <li><Link to='combined'>Sign Up</Link></li>
            //               </div>
            //             )
            //             }
            //             </div>    
            //             {/* Menu ka open hoga yhn  */}


            //          </div>
            //         </div>
            //     </div>

            //  </div>

            //  {/* input search */}

            //  {/* <input type='text' placeholder='Type to search' className='respSearch' />
            //  <i className="fa fa-search respI" aria-hidden="true"></i> */}
            // </div>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(
    mapStateToProps,{logoutUser}
)(ResponsiveNavbar)