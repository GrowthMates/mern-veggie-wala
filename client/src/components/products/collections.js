import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import './collections.css';
import {connect} from 'react-redux';
import ImageAppla from '../centralized/images/apple.jpg' 
import ImageIconList from '../centralized/images/list-icon.png' 
import ImageIconGrid from '../centralized/images/grid-icon.png' 
import {userCart} from '../../actions/productsAction'
import {addToCart} from '../../actions/productsAction'
import cart from '../users/userCart/cart';




class Collections extends Component{
    constructor(Props){
        super(Props);
        this.state={
            loader: true,
            veiwOption:false,
            name:'',
            price:undefined,
            description:'',
            quantity:undefined,
            products: undefined ,
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

    componentDidMount(){
        console.log(this.props)
    }
    shouldComponentUpdate(propd,state){
       console.log('shld cltn sy', propd,state)
        return true
    }
    componentWillReceiveProps (nextProps,props){
        // if(nextProps!=props){
            console.log("Prev. props......",props.products)
            console.log("Cart Array next......",nextProps.products)
            this.setState({
                products:nextProps.products,
                loader:false
            })
        }
        // else{
        //     console.log("nhi aya beta.......")
        // }
    

     onSubmit=(id,e)=>{
        e.preventDefault();
        console.log('onsubmit',id)
        // return false;
        // this.setState({
        //     name ,
        //     price ,
        //     description
        // })
        
        let productId = {
            productId: id,
            quantity:1
        }

        // this.props.history.push('/cart')

        // this.props.userCart(this.props.history);
        this.props.addToCart(productId)
        console.log('new prod')
        // this.props.history.push('/cart')
    }

    render(props){
        console.log("Collection of Products render sr: ", this.props)
        return(
            <div>
                 <section className='contact-upper col-lg-12' >
                    <div className='contact-img-text'>
                        <h1>Our Products </h1>
                        {/* <p>A Real Estate Organization You Can Trust</p> */}
                    </div>
               </section>

            <div className="container div-items">
                {/* {this.props.loading} */}
                <div className="row custom-row">
                    <div className="col-md-2 col-lg-2 col-sm-2 side-bar">
                       <div className="side-bar-section"> 
                            <h4>Categories</h4>
                                <ul className="side-list">
                                    <li className="side-list-items cursor-pointer">Fruits</li><hr/>
                                    <li className="side-list-items cursor-pointer">Vegetables</li><hr/>
                                    <li className="side-list-items cursor-pointer">Fresh Items</li><hr/>
                                </ul>
                        </div>
                       
                        <div className="side-bar-section"> 
                            <h4>Brand</h4>
                                <ul className="side-list">
                                    <li className="side-list-items cursor-pointer">Example Brand</li><hr/>
                                    <li className="side-list-items cursor-pointer">Gfruits-Store-Demo</li><hr/>
                                </ul>   
                        </div>

                        <div className="side-bar-section"> 
                            <h4>Product-Filter</h4>
                                <ul className="side-list">
                                    <li className="side-list-items cursor-pointer">Fruits</li><hr/>
                                    <li className="side-list-items cursor-pointer">Vegetables</li><hr/>
                                    <li className="side-list-items cursor-pointer">Fresh Items</li><hr/>
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
                                        <div className="dropdown">
                                            <button className="btn  dropdown-toggle drop-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Alphabetically, A-Z
                                            </button>
                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <a className="dropdown-item" href="#">Action</a>
                                                <a className="dropdown-item" href="#">Another action</a>
                                                <a className="dropdown-item" href="#">Something else here</a>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    
               

                        {
                          (this.state.veiwOption === false)?(
                             this.state.products || this.props.products.map((item,index) => {  
                           return(
                           <div key={index}>
                             <form >
                                 <div className='container team' >
                                            <div className='col-lg-4 prodImg'>
                                               <Link to = {`/product/${item._id}`} ><img className="cursor-pointer" src={ImageAppla} width='250' height='250' /></Link>
                                            </div>
                                            <div className="col-md-8 col-lg-8 data">
                                            <Link to = {`/product/${item._id}`} className='link-name'> <h6 className="item-name cursor-pointer">{item.name}</h6></Link>
                                                <h6 className="stretch">From Rs.{item.price}</h6><br/>
                                                <p>{item.description}</p><br/>
                                                {item.stock>0
                                                ?<button  onClick={this.onSubmit.bind(this,item._id)} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>
                                                :<p><u style={{color:'red'}}>Out of Stock</u></p>}
                                            </div>
                    
                                    </div>
                             </form>

                         
                            </div>)      })  

                        ):
                   (
                    
                        <div className="container">
                            
                                 <div className="row ">  
                                { this.props.products.map((item,index) => {  
                        return(
                                   <div className="col-md-4 col-lg-4 col-sm-4"> 
                                    <div className="card grid-view grid-card-styling" style={{width: '18rem'}}>
                                    <Link to = {`/product/${item._id}`}><img className="card-img-top cursor-pointer img-grid" src={ImageAppla} alt="..."/></Link>
                                            <div className="card-body" style={{paddingTop:'0px',textAlign:'left'}}>
                                            <Link to = {`/product/${item._id}`} className='link-name'> <h5 class="card-title cursor-pointer" style={{fontSize:'30px'}}>{item.name}</h5></Link>
                                                <p className="card-text">From Rs.{item.price}</p>
                                                {item.stock>0
                                                ?<button  onClick={this.onSubmit.bind(this,item._id)} className="btn btn-success" >Add to cart</button>
                                                :<p><u style={{color:'red'}}>Out of Stock</u></p>}
                                            </div>
                                    </div>
                                   </div> 
                        )})}



                                </div>    

                   </div>   )     
                   }
                   
         
                    </div>

                </div>
            </div>

        </div>  
        )
    }

}

// redux

const mapStateToProps = (state) => {

    // while(state.product.apiProducts)
    console.log('Collections ki product',state)
  
    return{
      products: state.products.products,
      cart:state.cart
  }
}


export default connect(
    mapStateToProps,
    { userCart, addToCart }
  )(Collections);