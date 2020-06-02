import React,{Component} from 'react';
import {Link, withRouter, Redirect} from 'react-router-dom';
// import { LazyLoadImage } from 'react-lazy-load-image-component';
import './collections.css';
import {connect} from 'react-redux';
import ImageAppla from '../centralized/images/apple.jpg' 
import ImageIconList from '../centralized/images/list-icon.png' 
import ImageIconGrid from '../centralized/images/grid-icon.png' 
import {addToCart, getProducts, userCart, countProducts} from '../../actions/productsAction'
import cart from '../users/userCart/cart';
import ProductCards from "../centralized/cards"
import { CloudinaryContext } from 'cloudinary-react';
import ReadOnlyRating from "../centralized/Reviews/readOnlyRating"
import Filteration from "./FilterCheck"
import Axios from 'axios';
// import GreenButton from "../centralized/buttons/greenButton"





class Collections extends Component{
    constructor(Props){
        super(Props);
        this.state={
            loading: true,
            veiwOption:false,
            name:'',
            price:undefined,
            description:'',
            quantity:undefined,
            products: undefined ,
            addToCart: false,
            user:undefined,
            redirect:false,
            fruitsList:false,
            vegetablesList:false,
            skip:0,
            limit:6,
            productsLength:undefined,
            selectedCategory:'',
            selectedTag:'',
            filters:{
                category:[],
                tag:[]
            }
        }
        this.ulRef = React.createRef()
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
        window.scrollTo(0, 0)
        if(!this.props.productsLength){
            this.props.countProducts()
        }
        console.log(this.props)
            console.log('Home DidMount====',this.props.products)
           if(this.props.products){ 
                this.setState({
                    products:this.props.products,
                    loading:false,
                    user:this.props.auth,
                    productsLength: this.props.productsLength
                })
            }
            
            
    }
   
    componentWillReceiveProps (nextProps,props){
        // if(nextProps!=props){
            console.log("Prev. props......",props.products)
            console.log("Cart Array next......",nextProps.products)
            // if(nextProps.products){
                
            // }
            this.setState({
                products:nextProps.products,
                loading:false,
                user:nextProps.auth,
                productsLength: nextProps.productsLength
            })
        }
        // else{
        //     console.log("nhi aya beta.......")
        // }
    

        loadMoreItems  = () => {
            let {products, limit,filters} = this.state
            const variables = {
                skip:products.length,
                limit:limit,
                filters
            }
           this.props.getProducts(variables)
           this.setState({
            skip:products.length,
            limit:limit
           })
            
        }

      

     onSubmit=(item,e)=>{

        e.preventDefault();
        console.log('onsubmit',item)
       
            let productId = {
                item,
                quantity:1,
                checker: false,
                userId:this.props.auth.user.id
    
            }
            // this.props.history.push('/cart')
    
    
            this.props.addToCart(productId)
            console.log('new prod====',productId)
            // this.props.history.push('/cart')
        
        
    }

    contniueShoping(){
        this.setState({
            addToCart: !this.state.addToCart
        })
    }
    goCart(){
        this.props.history.push('/cart')
    }

    showFilteredResults = (filters) => {

        let {limit} = this.state
        const checkAll = {...filters}.category.indexOf('All')
        if(checkAll!== -1){
             filters['category'] = []
        }
            const variables = {
                skip:0,
                limit:limit,
                filters
            }
            this.props.countProducts({filters:variables.filters})
           this.props.getProducts(variables)
           this.setState({
            skip:0
        })

    }

    handleFilters = (filters, type) => {
        console.log({filters,type})
        const newFilters = {...this.state.filters}

        newFilters[type] = filters
        this.showFilteredResults(newFilters)
        this.setState({
            filters:newFilters
        })
    }

    render(){
        console.log(this.state.filters)
        console.log("Collection of Products render sr: ", this.props)
        const {productsLength, products} = this.state
        if(this.state.redirect){
            return <Redirect to='/user/login'/>
        }
        return(
            <div>
                 <section className='product-upper col-lg-12' >
                    <div className='contact-img-text'>
                        
                    </div>
               </section>

            <div className="container div-items">
                {/* {this.props.loading} */}
                <div className="row custom-row">
                    <div className="col-md-3 col-lg-3 col-sm-3 side-bar">
                       <div className="side-bar-section"> 
                            <h4>Categories</h4>
                                <ul className="side-list">
                                  
                                    <Filteration obj='category' handleFilters={filters => this.handleFilters(filters, "category")}/>

                                  
                                </ul>
                        </div>
                       

                        <div className="side-bar-section"> 
                            <h4>Price-Filter</h4>
                                <ul className="side-list">
                                    <Filteration obj='price' handleFilters={filters => this.handleFilters(filters, "tag")}/>
                                   
                                </ul>
                        </div>

                   </div>


                    <div className="col-md-8 col-lg-8 col-sm-8 mainRight">
                                   
                        <div className="container">
                        
                            <div className="row row-col-2">
                                <div className="col-lg-12 col-md-12 item-view-sort">
                                    <div className='row'>

                                    <div className="col-lg-9 col-md-9 item-view">
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
                                    <span className="">Showing 1 - {products?.length || 0} of {productsLength||0} results</span>
                                    </div>
                                    <div className="col-lg-3 col-md-3 item-sort">
                                        <div className="dropdown">
                                            <button  className="btn  dropdown-toggle drop-btn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                            
                        </div>
                    
               {/* { {user.id?
                                        
                                            <img onClick={this.wishList.bind(this,user.id,item._id)}  src={heart1} width='23' height='23' alt=''/>
                                     
                                     :
                                      <Link to='/combined'> <img src={heart1} width='23' height='23' alt=''/>  </Link> }} */}

                        { (this.state.loading==true)?('Loading...'):(
                           <div>
                          {this.state.products?.length>0 ? 
                            <div>
                                {(this.state.veiwOption === false)?(
                             this.state.products?.map((item,index) => {  
                           return(
                           <div key={index} >
                               <div className="card mb-3 p1 " >
                                <div className="row no-gutters">
                                    <div className="col-md-4" style={{ overflow: 'hidden'}}>
                                    <Link to = {`/product/${item._id}`}> <img src={item.images[0].image} className="card-img cursor-pointer" alt="..." style={{height: '247px',maxHeight:'247px'}}/></Link>
                                    </div>
                                    <div className="col-md-8">
                                    <div className="card-body horizontal-cards" >
                                        <h2 className="card-title">{item.name}</h2>
                                        <p className="card-text"><ReadOnlyRating value={item.starRating?.length>0?Math.round(item.starRating.reduce((a,b)=>a+b)/item.starRating.length):0}/></p>
                                        <p className="card-text">Rs. {item.price}</p>
                                        <p className="card-text" style={{margin:'10px 0',fontWeight:'300'}}>{item.description.substring(0,78)+"..."}</p>
                                        {item.stock>0
                                                ? !this.state.user.isAuthenticated?<button  onClick={e=>{this.setState({redirect:true})}} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>
                                                :this.state.addToCart=== false ? 
                                                <div>
                                                <button onClick={this.onSubmit.bind(this,item)}  style={{fontWeight:'300'}} data-toggle="modal" data-target={`#addToCart${index}`} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>

                                                <div class="modal fade" id={`addToCart${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLongTitle"> {item.name} </h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close"  style={{fontWeight:'300'}}>
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <img src={item.image} width='120' height='120' style={{marginTop: '0px', marginBottom: '0px'}} />
                                                            Added To Cart Succesfully
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" onClick={this.contniueShoping.bind(this)} class="btn btn-secondary" data-dismiss="modal"  style={{fontWeight:'300'}}>Continue Shipping</button>
                                                            <button type="button" data-dismiss="modal" onClick={this.goCart.bind(this)} class="btn btn-primary"  style={{fontWeight:'300'}}>Go to Cart</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 </div>


                                                :      <button  onClick={this.onSubmit.bind(this,item)} type="button" className="btn btn-success btn-lg cart-btn"  style={{fontWeight:'300'}}>Add to cart</button>
                                                :<p><u style={{color:'red'}}>Out of Stock</u></p>}
                                         {/* <GreenButton buttonText='Add To Cart' redirectPath='/collections'/> */}

                                        {/* <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                    </div>
                                    </div>
                                </div>
                                </div>
                             {/* <form >
                                 <div className='container team'  style={{paddingBottom:'0'}} >
                                            <div className='col-lg-4 '>
                                               <Link to = {`/product/${item._id}`} ><img className="cursor-pointer prodImg" src={item.image[0]} width='250' height='250' /></Link>
                                            </div>
                                            <div className="col-md-8 col-lg-8 data">
                                            <Link to = {`/product/${item._id}`} className='link-name'> <h6 className="item-name cursor-pointer">{item.name}</h6></Link>
                                                <h6 className="stretch">From Rs.{item.price}</h6><br/>
                                                <p>{item.description.substring(0,78)+"..."}</p><br/>
                                                {item.stock>0
                                                ? !this.state.user.isAuthenticated?<button  onClick={e=>{this.setState({redirect:true})}} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>
                                                :this.state.addToCart=== false ? 
                                                <div>
                                                <button onClick={this.onSubmit.bind(this,item)}  data-toggle="modal" data-target={`#addToCart${index}`} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>

                                                <div class="modal fade" id={`addToCart${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div class="modal-dialog modal-dialog-centered" role="document">
                                                        <div class="modal-content">
                                                        <div class="modal-header">
                                                            <h5 class="modal-title" id="exampleModalLongTitle"> {item.name} </h5>
                                                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                                            <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </div>
                                                        <div class="modal-body">
                                                            <img src={item.image} width='120' height='120' style={{marginTop: '0px', marginBottom: '0px'}} />
                                                            Added To Cart Succesfully
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" onClick={this.contniueShoping.bind(this)} class="btn btn-secondary" data-dismiss="modal">Continue Shipping</button>
                                                            <button type="button" data-dismiss="modal" onClick={this.goCart.bind(this)} class="btn btn-primary">Go to Cart</button>
                                                        </div>
                                                        </div>
                                                    </div>
                                                 </div>
                                                 </div>


                                                :      <button  onClick={this.onSubmit.bind(this,item)} type="button" className="btn btn-success btn-lg cart-btn">Add to cart</button>
                                                :<p><u style={{color:'red'}}>Out of Stock</u></p>}
                                            </div>
                    
                                    </div>
                             </form> */}

                         
                            </div>)      })  

                        ):
                   (
                    
                        <div className="container">
                            
                            <CloudinaryContext cloudName="dbevearco">  
                                 <div className="row ">  
                                { this.props.products?.map((item,index) => {  
                        return(
                                   <div className="col-md-4 col-lg-4 col-sm-4"> 
                                       <ProductCards item={item}/>
                                   </div> 
                        )})}



                                </div>    
                                </CloudinaryContext>

                   </div>   )}

                   {productsLength && productsLength > products?.length?
                   <div className='load-more-btn'>
                       <button onClick={this.loadMoreItems}>Load More</button>
                   </div>
                   :''
                }
                            </div>
                            :
                            <div>No Items are Available</div>
                          }
                          

                
                            </div>
                   
                   
                   
                        )}
                   
         
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
      productsLength: state.products.productsLength, 
      cart:state.cart,
      loading:state.products.loading,
      auth: state.auth,
  }
}


export default connect(
    mapStateToProps,
    { userCart, addToCart, getProducts, countProducts }
  )(Collections);