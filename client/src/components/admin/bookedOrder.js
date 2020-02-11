import React,{Component} from 'react';
import axios from 'axios'



export default class BookedOrder extends Component{

    constructor(){
        super()
        this.state = {
            bookedOrderData: []
        }
    }

    componentDidMount(){
        axios
        .get('http://localhost:5000/api/bookedProducts')
        .then(res => {
            this.setState({
                bookedOrderData: res.data.data
            })

            // var mydata = this.state.bookedOrderData.map(i => {

            // })
            console.log(this.state.bookedOrderData)
        })
        .catch(err => {
            console.log('admin sy',err.message)
        })
    }

    render(){
        return(
                  <div className=''>
                      <div  style={{display: 'grid', gridTemplateColumns:'auto'}}>

                         <table className='table'>
                                    <thead className='cart-head'>
                                        <tr>
                                            <th scope='col'>Sr No</th>
                                            <th scope='col'>First Name</th>
                                            <th scope='col'>Last Name</th>
                                            <th scope='col'>Address</th>
                                            <th scope='col'>Appartment</th>
                                            <th scope='col'>Number</th>
                                            <th scope='col'>City</th>
                                            <th scope='col'>Time Stamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className='cart-body'>
                  {
                      this.state.bookedOrderData !== null ? this.state.bookedOrderData.map((i,index) => {
                          return (                                
                                        <tr>
                                                <td className='cart-body'>{index+1} </td>
                                                <td className='cart-body'>{i.fname}</td>
                                                <td className='cart-body'>{i.lname}</td>
                                                <td className='cart-body'>{i.address}</td>
                                                <td className='cart-body'>{i.appartment}</td>
                                                <td className='cart-body'>{i.number}</td>
                                                <td className='cart-body'>{i.city}</td>
                                                <td className='cart-body'>{i.timeStamp}</td>
                                        </tr>
                          )
                        })
                        :
                        <p>No data</p>
                        
                    }
                    </tbody>
                </table>
                    </div>
            </div>
        )
    }
}