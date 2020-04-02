import React, {Component} from 'react'
import shoppingcart from './images/shopping-cart.png'
import './style/navbar.css';
import {Link} from 'react-router-dom'

function myFunction(x) {
    x.classList.toggle("change");
  }

export default class ResponsiveNavbar extends Component{
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
            <div className='responsive'>
                <nav  className='sticky-top'  >
                    <div className='grid-container' >
                        <div  className='grid-item1'>
                            {this.state.toggle===true?
                            (
                                <div    onClick={this.hamburger.bind(this)} data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">
                                    <div className='bar1'></div>
                                    <div className='bar2'></div>
                                    <div className='bar3'></div>
                                </div>
                            )  :
                            (
                                <div  onClick={this.close.bind(this,)}
                                 data-toggle="collapse" data-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2"> X</div>
                            )  
                             }
                            
                           
                        </div>
                        <div  className='grid-item2'>
                        <Link to="/">
                            <img style={{width: "82px", height: '43px'}} src="//cdn.shopify.com/s/files/1/0027/9642/1229/files/gf.png?v=1559959830" className="img-fluid"/>
                        </Link>
                        </div>
                        <div  className='grid-item3'>
                        <img className='cursor-pointer dropbtn' src={shoppingcart} width='30' height='30.52'/>
                         <sup>1</sup>
                        </div>
                    </div>
                </nav>

                {/* Navbar hamburger after open */}
             <div className="row">
                <div className="col">
                    <div className="collapse multi-collapse" id="multiCollapseExample2">
                     <div className="card card-body">
                         {/* divider for top */}
                            <div className='hamburgerDivider'>
                                <div className={this.state.active ? 'linkActive  inner-item1' : 'notActive inner-item1'}  
                                 onClick={this.menu.bind(this)}>
                                        <div className='leftHamburger'>Menu</div>


                                </div>
                                    
                                <div  className={this.state.active1 ? 'linkActive  inner-item2' : 'notActive inner-item2'}
                                 className='inner-item2' onClick={this.login.bind(this)}>
                                        <div className='rightHamburger'>Login</div>
                                </div>
                         </div>

                         {/* divider for top ends here */}

                        {this.state.hamburgerInner===true?
                        (

                         <div>
                            <Link>sajakhdks</Link><br/>
                            <Link>sajakhdks</Link><br/>
                            <Link>sajakhdks</Link>
                            <Link>sajakhdks</Link>
                            <Link>sajakhdks</Link>
                            <Link>sajakhdks</Link>
                            <Link>sajakhdks</Link>
                            <Link>sajakhdks</Link>
                         </div>
                        )
                        :
                        (
                            <div>
                              login
                          </div>
                        )
                        }
                        {/* Menu ka open hoga yhn  */}


                     </div>
                    </div>
                </div>

             </div>

             {/* input search */}

             <input type='text' placeholder='Type to search' className='respSearch' />
             <i className="fa fa-search respI" aria-hidden="true"></i>
            </div>
        )
    }
}
