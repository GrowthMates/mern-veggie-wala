import React,{Component} from 'react';
import {connect} from 'react-redux'
import {updateProductStatus} from '../../actions/productsAction'
import './style/orders.css'
import axios from 'axios';

let log = console.log
class RecieveProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { orders:undefined,carts:undefined,status:'',index:'',loading:false,products:undefined}
    }

    onChange = (index,e) => {
        this.setState({ status: e.target.value,index })
    }
    componentDidMount() {
        if(this.props.carts){
            this.setState({
                carts:this.props.carts,
                products:this.props.products
            }) 
        }
        else{
            this.setState({
                carts:this.props.carts
            })
        }
               
    }

onSubmit(id,index,e){
    e.preventDefault()
    const {status} = this.state;

    let updateProductStatus = {
        productStatus:status,
        id,
        index,
        
    }

    this.props.updateProductStatus(updateProductStatus)

    log(updateProductStatus)
    this.setState({
        loading:true
    })
}

//WARNING! To be deprecated in React v17. Use new lifecycle static getDerivedStateFromProps instead.
componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if(nextProps.status!==undefined){
        this.setState({
            loading:false,
            products:this.props.products

        })

        let filtered = this.state.products;
        filtered.splice(this.state.index,1)
    }
}

    render() { 
        log(this.state.carts)
        let filtered = [];
        if(this.state.carts!==undefined){
            filtered= this.state.carts.filter(e => {return e.cart==='cart 1'})
        }
        log( 'cart vise => ' ,filtered)

        return ( 
            <div style={{padding: '10px 30px'}} >
                {/* <div className='row' >
                    <ul className='ordersUl' >
                        <li>ALl (3) </li>
                        <li>Completed (2) </li>
                        <li>Processing (7) </li>
                        <li>On-hold (0) </li>
                        <li>Pending (8) </li>
                        <li> Canceled (0) </li>
                        <li> Refund (0) </li>
                    </ul>
                </div> */}
{/* 
                <div className='row' >
                <select value={this.state.selectedCart} onChange={this.onChange} style={{width: '100%'}} class="custom-select" id="exampleFormControlSelect1" name='selectedCart'  >
                      <option>Select Cart Wise Orders</option>
                      { !this.state.carts? (<p>Loading ..........</p>) :
                      (this.state.carts.map((item,index) => {
                          return (
                              <option key={index} value={item.cart} > {item.cart} </option>
                          )
                      }))
                          
                      }    
                    </select>
                </div> */}
                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col"># </th>
                            <th scope="col"> Title </th>
                            <th scope="col"> Name </th>
                            <th scope="col"> Stock </th>
                            <th scope="col">Date</th>
                            <th scope="col">Status</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.length>=1 ?                           
                                !this.state.products ? <p>Loading......</p> : 
                           (this.state.products.map((item,index) => {
                                // return item.orders.map((i,ind) => {
                                    return item.status==='dispatch' ? (
                                        <tr key={index} >
                                {/* <th> {index+1} </th> */}
                                <th scope="row" style={{color: '#FF4747'}} > {index+1}  </th>
                                <td> <img  src={item.image[0]} width='80' height='80' />  </td>                                       
                                <td> {item.name} </td>                                       
                                <td> {item.stock} </td>                                       
                                <td> 02-03-2020 </td>                                       
                                {this.state.loading === true && this.state.index===index ? <p>Loading .....</p>
                                :( 
                                <td className='dropdown' >
                                     <select onChange={this.onChange.bind(this,index)} name='status' value={this.state.index===index? this.state.status: void 0} style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> 
                                        
                                        <option  value={item.status} style={{cursor:'pointer',background:'white',color:'black'}}> { (this.props.status!==undefined) && (this.state.index===index)? this.props.status.status : item.status} </option>
                                        <option  value='recieve' style={{cursor:'pointer',background:'white',color:'black'}}> Recieve </option>                                        
                                      </select> 
                                    {/* <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" onChange={(e) => {this.setState({status:e.target.value}) }}>    */}
                                    {/* </div> */}
                                </td>)}
                                {/* <td>{item.timeStamp!==undefined?  i.timeStamp.split(' ')[1] :void 0}</td> */}
                                <td > <button type='button' className='btn btn-danger' onClick={this.onSubmit.bind(this,item._id,index)} > Change Status </button> </td>
                                </tr>
                                    ) : void 0
                                })
                        //    })
                            ) : (<p>Loading ...</p>)
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 
// redux

const mapStateToprops = state => {
    log(state.products)
    return{
        carts: state.cartReducer.getCarts,
        status: state.products.status,
        products:state.products.products
    }
}
export default connect(mapStateToprops,{updateProductStatus})(RecieveProduct);