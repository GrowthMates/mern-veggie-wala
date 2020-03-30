import React,{Component} from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import TextField from '@material-ui/core/TextField';
import './style/newCart.css'
import axios from 'axios';

let log = console.log
class NewCart extends Component {
    constructor(props) {
        super(props);
        this.state = { orders:undefined,carts:undefined,selectedCart:'' }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    componentDidMount() {
    
        }
        
        // axios.get("http://localhost:5000/api/getOrders")
        // .then(res => {
        //     log(res.data);
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    
    render() { 
       
       

        return ( 
            <div className='newCart' >
               
                {/* <div className='topInner' > */}
                 <form id='topInner' >
                    <div>
                        <h3>Add New cart </h3>
                    </div>
                    <div>
                    <TextField
                    style={{width:'100%'}}
                    id="outlined-textarea"
                    label="cart Name"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    />
                    </div>
                    <div>
                    <TextField
                    style={{width:'100%'}}
                    id="outlined-textarea"
                    label="password"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    />
                    </div>
                    <div>
                    <TextField
                    style={{width:'100%'}}
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    />
                    </div>
                    <div>
                    <TextField
                    style={{width:'100%'}}
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    />
                    </div>
                    <div>
                    <TextField
                    style={{width:'100%'}}
                    id="outlined-textarea"
                    label="Address"
                    placeholder="Placeholder"
                    multiline
                    variant="outlined"
                    />
                    </div>
                    <div>
                        <button type='button' className='btn btn-block btn-primary' >register</button>
                    </div>
                 </form>
                {/* </div> */}
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
export default connect(mapStateToprops,null)(NewCart);