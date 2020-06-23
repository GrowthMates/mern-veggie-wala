import React,{Component} from 'react';
import Register from './register';
import Login from './login';
import {gmailLogin} from '../../actions/authActions';
import {connect} from 'react-redux'
import './register.css'





class Combined extends Component{

    componentDidMount() {
      window.scrollTo(0, 0)
        console.log('this.componentDidMount')
        //   var query = queryString.parse(this.props.location.search);
        //   console.log('query=====',query)
        //   if (query.token) {
        //     localStorage.setItem("jwtToken", query.token);
        //     this.props.history.push("/");
        // }

        // If logged in and user navigates to Login page, should redirect them to dashboard
        if (this.props.auth.isAuthenticated) {
          console.log(this.props.history)
          this.props.history.goBack(  )     //push("/dashboard");
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
        console.log("nextProp: ", nextProps.errors.message)
          this.setState({
            errors: nextProps.errors
          });
        }
      }

       userRegister = () => {
         console.log('userregister calle')
        
      }
      


    render(){
        if(window.location.pathname=='/user/login'){
          console.log('no way')
          return(
            <div>
               <div className='' style={{marginTop:'0'}}>
                 <div className='row' style={{width:'100%',minHeight: '42rem', margin: '0'}}>
                    <div className='col-md-6 col-lg-6' style={{padding:'5%',paddingLeft: '10%'}}>
                        <Login />
                    </div>
                    <div className='col-md-6 col-lg-6 signup-bg-img'>
                        {/* <Login /> */}
                        {/* <img src={SignUpSidePic} width='100%' height='100%' /> */}
                        <div className='signup-bg-inner-data'>
                          <div className='row'>
                            <h2 style={{width:'100%',fontWeight:'bold'}}>Create New Account</h2> <br/>
                          </div>
                           <div className='row' style={{justifyContent:'center',margin:'auto'}}><button  onClick={()=>this.props.history.push('/user/sign-up')}>Sign Up</button></div> 
                        </div>
                    
                    </div>
                 </div>
               </div>
            </div>
        )
        }
        else if(window.location.pathname=='/user/sign-up'){
          console.log(window.location.pathname)
          return(
            <div>
               <div className='' style={{marginTop:'0'}}>
                 <div className='row' style={{width:'100%'}}>
                    <div className='col-md-6 col-lg-6 signin-bg-img'>
                        {/* <Login /> */}
                        {/* <img src={SignUpSidePic} width='100%' height='100%' /> */}
                        <div className='signin-bg-inner-data'>
                          <div className='row'>
                            <h2 style={{width:'100%',fontWeight:'bold'}}>Already Have An Account?</h2> <br/>
                          </div>
                           <div className='row' style={{justifyContent:'center',margin:'auto'}}><button onClick={()=>this.props.history.push('/user/login')}>Sign In</button></div> 
                        </div>
                    
                    </div>
                    <div className='col-md-6 col-lg-6' style={{padding:'5%'}}>
                        <Register />
                    </div>
                 </div>
               </div>
            </div>
        )
         
        }
    }
}

const mapStateToProps = (state) => {

    // while(state.product.apiProducts)
    console.log('Combined State to Props',state)
  
    return{
      auth: state.auth,
      errors: state.errors
      
  }
}

export default connect(
    mapStateToProps,
   {gmailLogin}
  )(Combined);