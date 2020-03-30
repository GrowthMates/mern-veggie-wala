import React from 'react';
import {loginVendor} from '../../../store/actions/authActions'
import './style/signup.css'
import { connect } from 'react-redux';

class VendorLogin extends React.Component{ 
        state={
        email:'',
        password:'',
        }
  
      onChange = e => {this.setState({[e.target.name]:e.target.value})}

      onSubmit = e => {
          e.preventDefault()
          const {email,password} = this.state

          let loginVendor = {
            email,password
          }

        this.props.loginVendor(loginVendor,this.props.history)
          console.log(loginVendor)

      }
    render() {
        const {email,password} = this.state
  return (
    <div className="signupContainer ">
        <div className='parentBox container' >
            <div className='row innerCont' >
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
                    <button type="button" class="btn btn-primary" onClick={this.onSubmit} >Submit</button>

                </form>
            </div>
        </div>
    </div>  
  );
}
}
export default connect(null,{loginVendor})(VendorLogin);
