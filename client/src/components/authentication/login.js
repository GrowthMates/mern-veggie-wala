import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Redirect} from 'react-router-dom'
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import './register.css'


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
      componentDidMount() {
        // If logged in and user navigates to Login page, should redirect them to dashboard
        console.log('login ka did mount', this.props)
        if (this.props.auth.isAuthenticated) {
          // this.props.history.push("/dashboard");
         this.setState({
           auth:true

         })
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
          console.log("Login Props", this.props)
          // this.props.history.push("/dashboard"); // push user to dashboard when they login
        // <Redirect to='/dashboad'/>
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
                        className='textfields' 
                        id="password" 
                        type="password"
                        label='********'
                        className={classnames("", {
                            invalid: errors.password || errors.passwordincorrect
                          })}
                          />
                          <br/>
                          <span className="red-text" style={{color: 'red'}}>
                                {errors.password}
                                {errors.passwordincorrect}
                          </span>
                        
                        <br/>
                        {this.state.loading===true?<div class="loader"></div>:
                        <button type="submit" class="btn btn-secondary btn-lg btn-block"> Login </button>}
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