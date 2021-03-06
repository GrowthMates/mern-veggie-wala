import React,{Component} from 'react';
import TextField from '@material-ui/core/TextField';
import { Link, withRouter } from "react-router-dom";
import './register.css'
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';



function Alert(props){
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Register extends Component{

    constructor() {
        super();
        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          address: "",      
          number: "",      
          errors: {},
          success:false,
          open:false,
        };
      }

      componentDidMount() {
        // If logged in and user navigates to Register page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          // this.props.history.push("/dashboard");
        }
      }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({
            errors: nextProps.errors,
          });
        }
        if(nextProps){
          if(nextProps.auth.registered){
            this.setState({
              success:true,
              open:true,
            })
          }
        }
      }
    onChange = e => {
      e.preventDefault();
        this.setState({ [e.target.id]: e.target.value });
      };
    onSubmit = e => {
        e.preventDefault();
    const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
          address: this.state.address,
          number: this.state.number
        };
    this.props.registerUser(newUser, this.props.history); 
    this.setState({
      name: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      number: ''
    })
      };

      handleClose = (event, reason) => {
        this.setState({
          open:false
        })
        // if (reason === 'clickaway') {
        //   return;
        }
      
    render(){
        
        const { errors } = this.state;

        return(
          <div className='mainDiv'>
              <h4 className='name'>
                  Sign Up
              </h4>


              {/* <h5 class>
                  UserName <span style={{color: 'red'}}> *</span>
              </h5> */}

         <form noValidate onSubmit={this.onSubmit}>   
            <div className='fields'> 
               <h5 class>
                  UserName <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.name}
              error={errors.name}
              className='textfields' 
              id="name" 
              placeholder="UserName"
              required 
              className={classnames("", {
                invalid: errors.name
              })}
              />
              <span className="red-text">{errors.name}</span>
              <br/><br/>
              <h5 class>
                  Email Address <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.email}
              error={errors.email}
              className='textfields' 
              id="email" 
              placeholder="Email Address" 
              required
              className={classnames("", {
                invalid: errors.email
              })}
              />
               <span className="red-text">{errors.email}</span>
              <br/><br/>
              <h5 class>
                  Address <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.address}
              error={errors.address}
              autoComplete='address'
              className='textfields' 
              id="address" 
              placeholder="Address" 
              required
              />
              <br/><br/>
              <h5 class>
                  Password <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              autoComplete='new-password'
              className='textfields' 
              id="password"
              type='password' 
              placeholder='Password'
              required
              className={classnames("", {
                invalid: errors.password
              })}
              />
              <span className="red-text">{errors.password}</span>
              <br/><br/>
              <h5 class>
                  Confirm Password <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.password2}
              error={errors.password2}
              autoComplete='Confirm-password'
              className='textfields' 
              id="password2"
              type='password' 
              placeholder='Confirm Password'
              required
              className={classnames("", {
                invalid: errors.password2
              })}
              />
              <span className="red-text">{errors.password2}</span>
              <br/><br/>
              <h5 class>
                  Number <span style={{color: 'red'}}> *</span>
              </h5>
              <TextField 
              onChange={this.onChange}
              value={this.state.number}
              error={errors.number}
              autoComplete='Phone-Number'
              className='textfields' 
              id="number" 
              placeholder='Eg: +92 348673812'
              required
              />
              <br/><br/>
          
              <button type="submit" class="btn btn-secondary btn-lg user-signup-btn ">SignUp</button>
              
              </div>
          </form>
          <Snackbar open={this.state.success} autoHideDuration={6000} onClose={this.handleClose.bind(this)}>
              <Alert onClose={this.handleClose.bind(this)} severity="success">
                        Registered Successfully!
              </Alert>
            </Snackbar>
              
          </div>
             
        )
    }
}
Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };
  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });
  export default connect(
    mapStateToProps,
    { registerUser }
  )(withRouter(Register));