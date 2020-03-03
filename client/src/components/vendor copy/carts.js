import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import './style/orders.css'
import axios from 'axios';

let log = console.log
class Carts extends Component {
    constructor(props) {
        super(props);
        this.state = { orders:undefined,carts:undefined,selectedCart:'' }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    componentDidMount() {
        if(this.props.carts){
            this.setState({
                carts:this.props.carts

            }) 
        }
        else{
            this.setState({
                carts:this.props.carts
            })
        }
        
        // axios.get("http://localhost:5000/api/getOrders")
        // .then(res => {
        //     log(res.data);
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    }
    render() { 
        log(this.state.carts)
        let filtered = [];
        if(this.state.carts!==undefined){
            filtered= this.state.carts.filter(e => {return e.cart===this.state.selectedCart})
        }
        log( 'cart vise => ' ,filtered)

        return ( 
            <div style={{padding: '10px 30px'}} >
                <div className='row' >
                    <ul className='ordersUl' >
                        <li>ALl (3) </li>
                        <li>Completed (2) </li>
                        <li>Processing (7) </li>
                        <li>On-hold (0) </li>
                        <li>Pending (8) </li>
                        <li> Canceled (0) </li>
                        <li> Refund (0) </li>
                    </ul>
                </div>

                <div className='row' style={{marginTop: '10px'}}>
                <div className='col' >
                 <select value={this.state.selectedCart} onChange={this.onChange} style={{width: '100%'}} class="custom-select" id="exampleFormControlSelect1" name='selectedCart'  >
                      <option>Select carts</option>
                      { !this.state.carts? (<p>Loading ..........</p>) :
                      (this.state.carts.map((item,index) => {
                          return (
                              <option key={index} value={item.cart} > {item.cart} </option>
                          )
                      }))
                          
                      }    
                    </select>
                </div>
                <div className='col dropdown' style={{paddingLeft: '0px'}}>
                    <button style={{backgroundColor: '#3c8dBC',color: '#fff', fontSize: '20px'}} className='btn btn-block' type="button" ><Link style={{color: '#fff',textDecoration:'none'}} to='/admin/newCart' >Register New Cart</Link></button>
                   
                </div>
             </div>
                <div className='row' >
               
                </div>
                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Cart Name</th>
                            <th scope="col">Adress </th>
                            <th scope="col">Username</th>
                            <th scope="col">Password</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.length>=1 ? 
                            (filtered.map((item,index) => {
                                return item.orders.map((i,ind) => {
                                    return (
                                        <tr key={ind} >
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>15-feb-2020</td>
                                <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye"></i></td>
                                </tr>
                                    )
                                })
                           })
                            ) :
                                !this.state.carts ? <p>Loading......</p> : 
                           (this.state.carts.map((item,index) => {
                                return item.orders.map((i,ind) => {
                                    return (
                                        <tr key={ind} >
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>15-feb-2020</td>
                                <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye"></i></td>
                                </tr>
                                    )
                                })
                           })
                            )
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
    log(state.cartReducer.getCarts)
    return{
        carts: state.cartReducer.getCarts
    }
}
export default connect(mapStateToprops,null)(Carts);