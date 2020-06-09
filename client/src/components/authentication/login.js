import React from 'react';
import { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect, withRouter} from 'react-router-dom'
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import './register.css'

import GIcon from '../centralized/images/googleIcon.png'
// import queryString from "query-string";
import "./login.css"



class Login extends Component{

    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {},
          auth: false,
          loading:false,
          isAuth:false,
        };
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          console.log("Login Props", this.props)
        this.setState({
          auth: true
        })
        }
    if (nextProps.errors) {
        console.log("nextProp: ", nextProps.errors)
          this.setState({
            errors: nextProps.errors,
            loading:false
          });
        }
      }

      googleAuth(e){

        window.location.replace("/auth/google");
      }


    onChange = e => {
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
    const userData = {
          email: this.state.email,
          password: this.state.password
        };
    this.props.loginUser(userData); // since we handle the redirect within our component, we don't need to pass in this.props.history as a parameter
     
        this.setState({
          loading:true
        })
  };

    render(){

        const { errors } = this.state;
        if(this.state.auth===true){
          console.log(this.props)
          this.props.history.goBack()
          // return(
          // <Redirect to='/cart'/> 
          // )
        }
        return(
            <div>
              <div className='mainDiv'>
                <h4 className='name'>
                    Sign In
                </h4>
                {/* <button className='gmail-btn' onClick={this.googleAuth}>
                          <span>Sign In with Gmail</span>
                          <i style={{marginTop:'25px'}}><img src={GIcon} style={{backgroundColor:'white'}}  /></i>
                      </button> */}
                <form noValidate onSubmit={this.onSubmit}>
                        <div className='fields'> 
                        <h5 class>
                            User Name <span style={{color: 'red'}}> *</span>
                        </h5>
                        <TextField 
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email" 
                        placeholder="Your Email Address"
                        className={classnames("textfields", {
                            invalid: errors.email || errors.emailnotfound
                          })} 
                        />
                        <br/>
                        <span className="red-text" style={{color: 'red'}}>
                            {errors.email}
                            {errors.emailnotfound}
                        </span>
                        <br/><br/>

                        <h5 class>
                            Password <span style={{color: 'red'}}> *</span>
                        </h5>
                        <TextField 
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password" 
                        type="password"
                        placeholder='Password'
                        className={classnames("textfields", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                          />
                          <br/>
                          <span className="red-text" style={{color: 'red'}}>
                                {errors.password}
                                {errors.passwordincorrect}
                          </span>
                        
                        <br/>

                        <div className='row'>
                          <div>
                            <button type="submit" className='loginBtn' style={{fontWeight:'600'}}>Login</button>
                            <span style={{margin:'15px', fontWeight:'600'}}>OR</span>
                          </div>

                          <div>
                            
                            <button className='gmail-btn' > {/* onClick={this.googleAuth} */}
                              <span>Sign In with Gmail</span>
                              <i style={{marginTop:'25px'}}><img src={GIcon} style={{backgroundColor:'white'}} alt='Google Icon'  /></i>
                            </button>
                          </div>
                        </div>

                      </div>
                </form>
          
               </div>
            </div>
        )
    }
}
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  
  export default connect(
    mapStateToProps,
    { loginUser }
  )(withRouter(Login));