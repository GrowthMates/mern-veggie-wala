import React from 'react';
import { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import GIcon from '../centralized/images/googleIcon.png'
import queryString from "query-string";
import "./login.css"


class Login extends Component{

    constructor() {
        super();
        this.state = {
          email: "",
          password: "",
          errors: {},
          auth: false
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
        console.log("nextProp: ", nextProps.errors.message)
          this.setState({
            errors: nextProps.errors
          });
        }
      }

      googleAuth(e){

        window.location.replace("http://localhost:5000/auth/google");
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
      };

    render(){
        const { errors } = this.state;
        if(this.state.auth==true){
          return(
          <Redirect to='/dashboard'/> 
          )}
        return(
            <div>
              <div className='mainDiv'>
                <h4 className='name'>
                    Sign In
                </h4>
                <hr className='hrr' />
                <form noValidate onSubmit={this.onSubmit}>
                        <div className='fields'> 
                        <h5 class>
                            UserName <span style={{color: 'red'}}> *</span>
                        </h5>
                        <TextField 
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        className='textfields' 
                        id="email"
                        type="email" 
                        label="Ayyan"
                        className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })} 
                        />
                        <span className="red-text">
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
                        className='textfields' 
                        id="password" 
                        type="password"
                        label='********'
                        className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                          />
                          <span className="red-text">
                                {errors.password}
                                {errors.passwordincorrect}
                          </span>
                        
                        <br/>
                        
                        <button type="submit" className='loginBtn'>Login</button>
                            <span style={{margin:'20px', fontWeight:'600'}}>OR</span>
                        {/* <input style={{width:'250px',height:'50px', marginTop:'25px'}} type='button' value='Sign In with Gmail' onClick={this.googleAuth}/>
                        <i style={{position:'sticky',marginTop:'25px'}}><img src={GIcon}/></i> */}
                        <button className='gmail-btn' onClick={this.googleAuth}>
                          <span>Sign In with Gmail</span>
                          <i style={{marginTop:'25px'}}><img src={GIcon} style={{backgroundColor:'white'}}  /></i>
                          </button>
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
  )(Login);