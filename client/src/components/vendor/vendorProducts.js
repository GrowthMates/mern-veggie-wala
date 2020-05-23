import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux'
import {selectedproduct,getProducts} from '../../actions/adminAction'
import axios from 'axios'
import './style/vendorProducts.css'
// import prod1 from '../centralized/images/prod1.png'

const log = console.log
class VendorProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { stockShort:false,products:undefined,loading:false,error:'',successAlert:false,delAction:false,id:'' }
    }

    componentDidMount(){

    }
    delAction(id,index){
        this.setState({
            delAction:true,
            id:id
        })
    }
    delItem(id,index){
        this.setState({
            // products:filtered,
            loading:true,
            // error:err.message
        })
        // log(id)
        let _id = {id}
        axios.post("/api/deleteProduct",_id)
        
        .then(res => {
            log("delete ka res",res);
            this.props.getProducts()
            if(res.data._id){
                let filtered = this.props.products;
                filtered.splice(index,1)
                this.setState({
                    products:filtered,
                    loading:false,
                    successAlert:true,
                    delAction:false,
                })
                
            }
        })
        .catch(err => {
            log("error delete prdct ka",err);
            this.setState({
                // products:filtered,
                loading:false,
                error:err.message
            })
        })

        let filtered = this.props.products;
        filtered.splice(index,1)
        this.setState({
            products:filtered
        })
    }

    product(item){
        this.props.selectedproduct(item)
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        log(nextProps)
        if(nextProps.products){
            let product = nextProps.products
            this.setState({
                product:nextProps.products,
                name: product.name,
                price: product.price,
                description: product.description,
                stock: product.stock,
                category: product.category,
                imagePreviewUrl: product.images,
                cartStock: product.cartStock,
                id: product.id
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.successAlert) {
          // when the state is updated (turned red), 
          // a timeout is triggered to switch it back off
          this.turnOffRedTimeout = setTimeout(() => { 
            this.setState(() => ({successAlert: false,errors:false}))
          }, 2000);
        }
      }
      componentWillUnmount() {
        // we set the timeout to this.turnOffRedTimeout so that we can
        // clean it up when the component is unmounted.
        // otherwise you could get your app trying to modify the state on an
        // unmounted component, which will throw an error
        clearTimeout(this.turnOffRedTimeout);
      }
        render() { 
        
        let products = []
        // let fl = []
        // let final = []
        let bilkulFinal = []
        if(this.props.products){
        if(this.props.products.length>=1){
            products = this.props.products||this.state.products
            // let dummy = [85,45,5,8,2,6,7,10,52,35,3,4,20,]
        
            //  log(final)
            
             products.forEach(i => {
                 let totalStock=[]
                 let stock=[0]
                 let filtered = bilkulFinal.filter(element => {
                     return element.id === i._id
                    })

                if(bilkulFinal.indexOf(i)===-1 && (i.cartStock!==null) ){
                    i.cartStock.forEach(e => {
                     
                        totalStock.push(parseInt(e.stock));
      
                       stock=totalStock
                       

                    })
                }
                bilkulFinal.push({id:i._id, stock,images: i.images,price: i.price,name:i.name,description:i.description,category:i.category,cartStock:i.cartStock,status:i.status,alarmingStock:i.alarmingStock})    

                
                // fl=bilkulFinal

            });
            
            //  products=bilkulFinal;
            log(bilkulFinal)
            // let addedStock = bilkulFinal
             let filtered = bilkulFinal.filter(e =>  {return e.stock.reduce((a,b) => {return a+b}   ) <= e.alarmingStock })
             let greater = bilkulFinal.filter(e =>  {return e.stock.reduce((a,b) => {return a+b}   ) > e.alarmingStock })
             // let greater = products.filter(e=>{return e.stock>5})
              let final = [...filtered,...greater];
            //   greater.forEach(element => {
            //       final.push(element)
            //   });
            log(filtered,greater,bilkulFinal)
              final.sort(function(a,b){return a-b})

              products=final
            //   log(bilkulFinal.map(i => {return i.stock.reduce((a,b)=> {return a+b} )}))
            //   final.forEach(e => {
            //   })
            log(products)
        }
        else log(this.props.product)
      }
      else log(this.props.product)
      console.log(this.state)
      
        return ( 
            <div>

               {this.state.successAlert!==true ? void 0 : ( <div className='row' style={{position: 'fixed',zIndex: '10000',width:'100%'}} >
                    <div className='col-6' >
                     <div class="alert alert-primary" role="alert" style={{textAlign:'left'}}>
                             Product Succesfully deleted..........("_")
                     </div>
                    </div>
                    <div className='col-6' >

                    </div>
                </div>)}
                <div className='row' >
                    <div className='col-lg-6' >
                        <ul className='productsHeaderUl' >
                            <li >All(13)</li>
                            <li> Online(25) </li>
                            <li> Pending Review(30) </li>
                            <li> Draft(20) </li>
                        </ul>
                    </div>
                    <div className='col-lg-6' >
                        <div>
                            <button style={{backgroundColor: '#3C8DBC',color: 'white', float: 'right',margin: '15px',fontSize: '16px',fontWeight: '500'}} className='btn btn-block' > <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> 
                            <Link to='/admin/addProduct' id='aTag'  > Add new product </Link> </button>
                        </div>
                    </div>
                </div>
                {/* Product Section body */}

                <div className='row' >
                    <div class='col-lg-12' >
                        <table class="table table-hover">
                            <thead>
                                <tr style={{textAlign: 'left'}} >                                
                                <th scope="col">#</th>
                                <th scope="col">Item</th>
                                <th scope="col">Name</th>
                                {/* <th scope="col">Status</th> */}
                                {/* <th scope="col">Sku</th> */}
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col">Category</th>
                                <th scope="col">Published</th>
                                </tr>
                            </thead>
                            <tbody >
                                { this.props.status===true ? (<p>{this.props.error}</p>) :  products.length===0? <p>Loading...</p> : (
                                    products.map((item,index) => {
                                        log(item)
                                        
                                        // =================================//
                                        //  Write item.status == 'receive'  // 
                                        //  to display just received items //
                                        //================================//
                                    return  item.status? (
                                            <tr className='productRows'  style={{textAlign: 'left'}} >
                                            <td scope='row' > {index+1} </td>
                                            <td scope='row' > <img src={item.images&&item.images.length!==0?item.images[0].image:''} alt={`${item.name} image`} width='60' height='60' /> </td>
                                          { this.state.delAction!==false && (this.state.id===item.id) ? 
                                             ( <td  className="alert alert-danger row" role="alert" style={{margin:"10px",position:"relative"}} >                                                   

                                                        <div  className="col-12"  >
                                                            Your Product  <b>" {item.name} "</b>  will be delete Permanantly. Are you Sure ("_")...!
                                                        </div>
                                                        <div className='col-12' >
                                                         <button type='button' style={{backgroundColor: '#C82333',marginTop:'10px'}} className='btn btn-block btn-danger' onClick={this.delItem.bind(this,item.id,index)}>Delete</button>                                                                                                                                                                                
                                                        </div>
                                                    <p style={{position:'absolute',top:'0px',right:'10px',color:'#FB005B',cursor:'pointer'}} onClick={()=> {this.setState({delAction:false})}}> X </p>
                                                </td>) :
                                          (<td style={{color: '#FF4747'}} > {item.name}
                                                <br/>
                                                <ul className='productActions' >
                                                    <li onClick={this.product.bind(this,item)} style={{paddingleft: '0px'}}> <Link style={{color: 'brown'}} className='text-decoration-none' to = {`/admin/edit/${item.id}`} > Edit</Link></li>
                                                    <li >|</li>
                                                     {this.state.loading===true? (<li> Loading...... </li>) : !this.state.error ? (<li onClick={this.delAction.bind(this,item.id,index)}>  Delete Permanantly</li>) : (<li> {this.state.error} </li>) } 
                                                    <li >|</li>
                                                    <a href = {`/product/${item.id}`} target='_blank'> <li >View</li></a>
                                                </ul>
                                            </td>)}
                                            {item.stock.reduce((a,b)=> {return a+b} )<=5? (<td style={{color: 'red',fontWeight: '700'}}>  {item.stock.reduce((a,b)=> {return a+b} )} </td>): 
                                                (<td style={{ color: 'limegreen',fontWeight: '600'} } > {item.stock.reduce((a,b)=> {return a+b} )}  </td>)
                                        }
                                           

                                            <td> {item.price} </td>
                                            <td> {item.category} </td>
                                            <td>14-feb-2020 <br/>Published</td>
                                           
                                        </tr>
                                        ) : void 0
                                    })
                                )  }
                             
                              
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
         );
    }
}
const mapStateToprops = state => {
    log('redux nechy sy invntry ki', state)
    return {
        products: state.products.products,
        error: state.products.productErrors,
        status: state.products.error
    }
}
 
export default connect(mapStateToprops,{selectedproduct,getProducts})(VendorProducts);