import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {loginAdmin} from "../../../actions/adminAction"
import PropTypes from "prop-types";
import classnames from "classnames";


import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function SignInSide(props) {
  const classes = useStyles();
  console.log('Props from Admin login===',props)

  let [email, setEmail] = useState('')
  let [password, setPassword] = useState('')
  let [errors, setErrors] = useState({})
  let [loading, setLoading] = useState(false)

  // Checking if Admin already Logged in
  useEffect(() => {
    console.log('useEffect chla h',email)
     // Checking Errors... 
      if (props.errors) {
        console.log("nextProp: ", props.errors)
        setErrors(props.errors)   
      }  
  },[props.errors])

  if (props.auth.isAuthenticated) {
    console.log("Login Props", props)
    return(
        <Redirect to='/admin/landingPage'/> 
        )
      }
  




  function onChangeHandler(event)  {
    console.log('Admin login event===',event.target.name,event.target.value)
    if(event.target.name==='email'){
      setEmail(event.target.value)
    }
    if(event.target.name==='password'){
      setPassword(event.target.value)
    }
  }
  function onSubmitHandler()  {
    console.log('Admin login onsubmit',email,password)
    if(email && password && email!=='' && password!==''){
      const userData = {
        email,
        password
      };
      props.loginAdmin(userData)
      setEmail('')
      setPassword('')
      setErrors({})   

    } 
  }

 
  return (
   

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={onChangeHandler}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              className={classnames("textfields", {
                invalid: errors.email || errors.emailnotfound
              })} 
            />
            <br/>
            <span className="red-text" style={{color: 'red'}}>
                {errors.email}
                {errors.emailnotfound}
            </span>
            <br/>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              onChange={onChangeHandler}
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              className={classnames("textfields", {
                invalid: errors.password || errors.passwordincorrect
              })}
              />
              <br/>
              <span className="red-text" style={{color: 'red'}}>
                    {errors.password}
                    {errors.passwordincorrect}
              </span>
            
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={onSubmitHandler}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              
            </Grid>
            
          </form>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  console.log('Store from Admin login===',state)
  return{
    products:state.products.products,
    auth: state.AdminAuth,
    errors: state.errors
  }
}

export default connect(mapStateToProps,{loginAdmin})(SignInSide)