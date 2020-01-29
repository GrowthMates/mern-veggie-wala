import React, {Component} from 'react';
import {connect} from 'react-redux'
import axios from 'axios'


 class CartOwner extends Component{

    constructor(){
        super()
        this.state = {
            products: [],
            total: undefined,
        }
    }

    componentDidMount(){
        axios
        .get("http://localhost:5000/api/cartOwner/reciept")
        .then((res) => {
                       
            this.setState({
                products: res.data.data
            })
            
            console.log("Products success", this.state.products)
                          }) // re-direct to login on successful register
        .catch(err =>
        console.log('Product err: ',err.message)
        );

      

    }
render(){
    var arr = [0]
  return (
        <div>
           <h2>Your Order Reciept </h2>
            <hr />


            <table class="table table-striped">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Cell#</th>
                    <th scope="col">Address</th>
                    <th scope="col">Dated</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                   {
                      this.state.products === []? <p>no reciept</p>  : this.state.products.map((item,index) => {
                           return(
                    <tr key={item._id}>
                    <th scope="row">{index+1}</th>
                    <td>{item.fname} {item.lname} </td>
                    <td>{item.number}</td>
                    <td>{item.address}</td>
                    <td>{item.timeStamp}</td>
                    <td> <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#reciept${index}`}>
                        Reciept
                        </button> </td>

                      <div class="modal fade" id={`reciept${index}`} tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-centered" role="document">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                <table>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Item</th>
                                    <th scope="col">quantity</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Line Total</th>
                                    
                                </tr>
                            {
                                    item.cartProducts.map((i,index) => {
                                        arr.push((i.price)*i.quantity)
                                           return(
                                            <tr>
                                                <th scope="row"> {index+1} </th>
                                                <td>{i.name}</td>
                                                <td>{i.quantity}</td>
                                                <td> {i.price} </td>
                                                <td>  {(i.price)*i.quantity } </td>
                                                {/* <p>Total: {arr.reduce((a, b) => {return a + b})} </p> */}

                                             </tr>
                                           
                                           
                                           )
                                        })
                                    }
                                </table>
                            </div>
                                    <p>Total: {arr.reduce((a, b) => {return a + b})} </p>
                                    { arr=[]  }
                            <div class="modal-footer">
                                {/* <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> */}
                                <button type="button" class="btn btn-primary">Print</button>
                            </div>
                            </div>
                        </div>
                        </div>
                    </tr>
                        )})}
                </tbody>
             </table>
          
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>





















            {/* reciept nchy sy hy */}

            <div className='row' >
            <div className="col-lg-3">
                <h2>Cart owner dashboard</h2>
            </div>

            <div className="col-lg-8">

                            {
                                this.state.products === []? <p>no reciept</p>  : this.state.products.map((item,index) => {
                                    return(
                <div class="jumbotron" key={index}>

                   <div className='container'>
                     <div className='row'>
                        <div className="col-lg-6" >
                            <h5>Bill From</h5>
                            <p>Nippa blossam trade tower</p>
                            <p>Karachi </p>
                        </div>

                        <div className="col-lg-6" >
                            <h5>Image</h5>
                        </div>
                     </div>
                   </div>
                    <hr />

                    <div className='container' >
                     <div className='row'>

                        <div className="col-lg-6" >
                            <h5>Bill To</h5>
                                        <div>
                                            <p>Name: {item.fname} {item.lname}</p>
                                            <p>Cell#:{item.number}</p>
                                            <p>Address: {item.address}</p>
                                            <p>City: {item.city}</p>
                                        </div>
                        </div>

                        <div className="col-lg-6" >
                            <h5>Invoice# 0047</h5>
                            <p>Invoice {item.timeStamp} </p>
                            <p>Karachi </p>
                        </div>

                     </div>
                   </div>
                                   
                    <hr />
                    
                    <div className='container'>
                     <table class="table table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Item</th>
                            {/* <th scope="col">Description</th> */}
                            <th scope="col">Quantity</th>
                            <th scope="col">unit Cost</th>
                            <th scope="col">Line Total</th>
                            </tr>
                        </thead>
                            <tbody>
                                {
                                    item.cartProducts.map((i,index) => {
                                        arr.push((i.price)*i.quantity)
                                           return(
                                            <tr>
                                                <th scope="row"> {index+1} </th>
                                                <td>{i.name}</td>
                                                <td>{i.quantity}</td>
                                                <td> {i.price} </td>
                                                <td>  {(i.price)*i.quantity } </td>
                                             </tr>
                                           
                                          
                                        )
                                    })
                                }
                            
                            </tbody>
                        </table>

                        <p>Total: {arr.reduce((a, b) => {return a + b})} </p>
                    </div>

                </div>
                 )
                })
            }
            </div>

            </div>
        </div>
    )
 }
}


export default connect(
  null,
 null
)(CartOwner); ;