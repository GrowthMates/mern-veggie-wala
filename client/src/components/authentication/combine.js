import React,{Component} from 'react';
import Register from './register';
import Login from './login';
import {gmailLogin} from '../../actions/authActions';
import {connect} from 'react-redux'



class Combined extends Component{

    componentDidMount() {
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


    render(){
        return(
            <div>
               <div className='container'>
                 <div className='row'>
                    <div className='col-lg-6'>
                        <Login />
                    
                    </div>
                    <div className='col-lg-6'>
                        <Register />
                    </div>
                 </div>
               </div>
            </div>
        )
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