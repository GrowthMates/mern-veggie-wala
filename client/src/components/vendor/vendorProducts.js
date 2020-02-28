import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import {connect}  from 'react-redux'
import axios from 'axios'
import './style/vendorProducts.css'
// import prod1 from '../centralized/images/prod1.png'

const log = console.log
class VendorProducts extends Component {
    constructor(props) {
        super(props);
        this.state = { stockShort:false }
    }

    componentDidMount(){

    }

    delItem(id){
        log(id)

        axios.post("http://localhost:5000/api/deleteProduct",id)
        .then(res => {
            log("delete ka res",res)
        })
        .catch(err => {
            log("error delete prdct ka",err)
        })
    }
    render() { 
        
        let products = []
        let fl = []
        let final = []
        let bilkulFinal = []
        if(this.props.products){
        if(this.props.products.length>=1){
            products = this.props.products
            // let dummy = [85,45,5,8,2,6,7,10,52,35,3,4,20,]
            let filtered = products.filter((i,ind) => {return (i.cartStock.filter(el=>{return el.stock<=5}))})
            let greater = products.filter((i,ind) => {return (i.cartStock.filter(el=>{return el.stock>5}))})
            // let greater = products.filter(e=>{return e.stock>5})
             let final = filtered;
             greater.forEach(element => {
                 final.push(element)
             });
             final.sort(function(a,b){return a-b})
            //  log(final)
            
             products.forEach(i => {
                 let totalStock=[0]
                 let filtered = bilkulFinal.filter(element => {
                     return element.id === i._id
                    })

                    let hmra = bilkulFinal.indexOf(i) 
                    log(hmra)
                if(bilkulFinal.indexOf(i)===-1){
                    i.cartStock.forEach(e => {
                     
                        totalStock.push(parseInt(e.stock));
                        totalStock.reduce((a,b)=> {return a+b} )
                        // let stock = totalStock
                       
                        bilkulFinal.push({id:i._id, stock:totalStock,image: i.image,price: i.price,name:i.name})    
                    })
                }
                
                // fl=bilkulFinal

            });
            
             products=bilkulFinal;
            //   log(bilkulFinal.map(i => {return i.stock.reduce((a,b)=> {return a+b} )}))
            //   final.forEach(e => {
            //   })
            log(products)
        }
      }
      
        return ( 
            <div>
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
                            <button style={{backgroundColor: '#FF4747',color: 'white', float: 'right',margin: '15px',fontSize: '16px',fontWeight: '500'}} className='btn' > <i style={{marginRight: '10px'}} class="fa fa-credit-card-alt"  aria-hidden="true"></i> 
                            <Link to='/admin/addProduct' Style={{color: 'white', fontSize: '16px'}} > Add Add new product </Link> </button>
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
                                <th scope="col">Views</th>
                                <th scope="col">Published</th>
                                </tr>
                            </thead>
                            <tbody >
                                { this.props.status===true ? (<p>{this.props.error}</p>) :  products.length==0? <p>Loading...</p> : (
                                    bilkulFinal.map((item,index) => {
                                        return (
                                            <tr className='productRows'  style={{textAlign: 'left'}} >
                                            <td scope='row' > {index+1} </td>
                                            <td scope='row' > <img src={item.image} width='60' height='60' /> </td>
                                            <td style={{color: '#FF4747'}} > {item.name}
                                                <br/>
                                                <ul className='productActions' >
                                                    <li style={{paddingleft: '0px'}}> <Link style={{color: 'brown'}} className='text-decoration-none' to = {`/admin/edit/${item._id}`} > Edit</Link></li>
                                                    <li >|</li>
                                                    <li onClick={this.delItem.bind(this,item._id)}>Delete Permanantly</li>
                                                    <li >|</li>
                                                    <li >View</li>
                                                </ul>
                                            </td>
                                            {/* <td> <span style={{marginTop: '10px', backgroundColor: 'limegreen', color: '#ffffff',padding: '5px',fontWeight: '500'}} >Online</span> </td> */}
                                            <td> {item.stock} </td>
                                            {/* {item.stock<=5? <td style={{color: 'red',fontWeight: '700'}} > {item.stock} </td>:
                                            
                                            <td style={{ color: 'limegreen',fontWeight: '600'} } > {item.stock}  </td>} */}
                                            <td> {item.price} </td>
                                            <td>8</td>
                                            <td>14-feb-2020 <br/>Published</td>
                                           
                                        </tr>
                                        )
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
 
export default connect(mapStateToprops,null)(VendorProducts);