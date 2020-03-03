import React from 'react';
import {registerVendor} from '../../../store/actions/authActions'
import './style/signup.css'
import { connect } from 'react-redux';

class VendorSignup extends React.Component{ 
        state={
            fname:'',
            lname:'',
            number:'',
            shop:'',
            email:'',
            password:''
        }
  
      onChange = e => {this.setState({[e.target.name]:e.target.value})}

      onSubmit = e => {
          e.preventDefault()
          const {fname,lname,number,shop,email,password} = this.state

          let newVendor = {
            fname,lname,number,shop,email,password
          }

        this.props.registerVendor(newVendor,this.props.history)
          console.log(newVendor)

      }
    render() {
        const {fname,lname,number,shop,email,password} = this.state
  return (
    <div className="signupContainer ">
        <div className='parentBox container' >
            <div className='row innerCont' >
                <div className='col-9' >
                    <h3>Abc company</h3>
                    <h2 style={{fontWeight: '600'}} > Craete Your ex Account</h2> 
                    <h5 style={{fontSize: '20px'}} > To continue with us </h5>
                    <form>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input value={email} type="email" class="form-control" id="exampleInputEmail1" name='email'  onChange={this.onChange} aria-describedby="emailHelp"/>
                            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Password</label>
                            <input value={password} type="password" class="form-control" id="exampleInputPassword1" name='password'  onChange={this.onChange} />
                        </div>
                        {/* <div class="form-group form-check">
                            <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                            <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div> */}
                        <div className='row' >
                            <div className='col' >
                            <div class="form-group">
                                <label for="exampleInputPassword1">First Name</label>
                                <input value={fname} type="text" class="form-control" name='fname'  onChange={this.onChange}  id="exampleInputPassword1"/>
                             </div>
                            </div>
                            <div className='col' >
                            <div class="form-group">
                                <label for="exampleInputPassword1">Last Name</label>
                                <input value={lname} type="text" class="form-control" name='lname'  onChange={this.onChange}  id="exampleInputPassword1"/>
                             </div>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Shope Name</label>
                            <input value={shop} type="text" class="form-control" name='shop'  onChange={this.onChange}  id="exampleInputPassword1"/>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputPassword1">Phone Number</label>
                            <input value={number} type="number" class="form-control"  name='number'  onChange={this.onChange} id="exampleInputPassword1"/>
                        </div>
                        <button type="button" class="btn btn-primary" onClick={this.onSubmit} >Submit</button>
                    </form>
                </div>
                <div className='col-3' >

                </div>
            </div>
        </div>
    </div>  
  );
}
}
export default connect(null,{registerVendor})(VendorSignup);
