import React,{Component} from 'react';
import axios from 'axios'




export default class DelProducts extends Component{

    constructor(){
        super()
        this.state = {
            delProduct: [],
            evein:true
        }
    }

    componentDidMount(){
        axios
        .get('http://localhost:5000/api/products')
        .then(res => {
            this.setState({
                delProduct: res.data,
                evein:!this.state.evein
            })

            // var mydata = this.state.delProduct.map(i => {

            // })
            console.log(this.state.delProduct)
        })
        .catch(err => {
            console.log('admin sy',err.message)
        })
    }

    delete(key){
        console.log(key, 'id')

        axios.post("http://localhost:5000/api/delProducts", key)
            .then(res => {

                // cartProducts.splice(index,1);
                var delFromLocalStorage=this.state.delProduct.findIndex(i=> i._id===key);
                if(delFromLocalStorage!==-1){
                    this.state.delProduct.splice(delFromLocalStorage,1);
                //   localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
                  this.setState({
                                evein: false
                            })
                  console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
                }
                else{
                    console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

                }
                console.log('evien', this.state.evein)
                console.log('respnse del admin ka', res.data,)

                // console.log('del ka res', res.data.cart)
                // console.log('del ka res', cartProducts.filterProduct._id)
                // var delFromLocalStorage=cartProducts.findIndex(cart=>cart.cartSchemaId===key);
                // if(delFromLocalStorage!==-1){
                //     cartProducts.splice(delFromLocalStorage,1);
                //   localStorage.setItem('CartProduct', JSON.stringify(cartProducts));
                //   this.setState({
                //                 evein: false
                //             })
                //   console.log('del k ho gai lcl strge sy... ', delFromLocalStorage)
                // }
                // else{
                //     console.log('del nh hui lcl strge sy... ', delFromLocalStorage)

                // }
                // localStorage.removeItem('CartProduct');
            })

            .catch(err => {
                console.log('cart del ka error.. >',err.message)
            })


    }

    render(){
        return(
                  <div className='container'>
                         <table className='table'>
                                    <thead className='cart-head'>
                                        <tr>
                                            <th scope='col'>Sr No</th>
                                            <th scope='col'>Image</th>
                                            <th scope='col'>Name</th>                                           
                                            <th scope='col'>Price</th>
                                            <th scope='col'>Description</th>
                                            <th scope='col'>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody className='cart-body'>
                  {
                      this.state.delProduct !== null ? this.state.delProduct.map((i,index) => {
                          return (                                
                                        <tr>
                                                <td className='cart-body'>{index+1} </td>
                                                <td className='cart-body'> image aygi </td>
                                                <td className='cart-body'>{i.name}</td>
                                                <td className='cart-body'>{i.price}</td>
                                                <td className='cart-body'>{i.description}</td>
                                                <td className='cart-body'>
                                                    <button onClick={this.delete.bind(this,i._id)}
                                                    type="submit" class="btn btn-danger"> Delete</button>
                                                </td>
                                        </tr>
                          )
                        })
                        :
                        <p>No data</p>
                        
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}