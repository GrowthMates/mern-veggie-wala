import React from 'react';
import { connect } from 'react-redux';
import {stepThree} from '../../../store/actions/vendor/storeAction'
// import StepThree from './stepThree'
import VendorLandingPage from '../vendorLandingPage'
import './style/register.css'
import { Redirect } from 'react-router-dom';
let log = console.log
class StepThree extends React.Component{ 
        state={
          name: '',
          companyName: '',
          ntn: '',
          city:'',
          success: false
        }
  
        onChange=e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
      // let newArr = []
      e.preventDefault();

      const {name,companyName,ntn,city} = this.state

      if(this.props.storeId){

        let stepOnedata = {
        name,companyName,ntn ,city,storeId: this.props.storeId
  
        }
  
        let newData = this.props.prevdata;
        newData.push(stepOnedata);
        this.props.stepThree(newData)
      }

      
      // log(this.props)
    }

    componentWillReceiveProps(nextProps){
      // if(nextProps.step===true){
      // }
      if(nextProps.registrationComplete===true){
            this.setState({
              success: true
            })

      }
    }
    render() {
      const {name,companyName,ntn,city} = this.state;
      if(this.state.success===true){
        return (
          <Redirect  to='/vendor/landingPage'/>
        )
      }
  return (
    <div className=" ">
        <div className='container' >
          <div className='row' >
              <div className='col' >
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Three Name</label>
                  <input onChange={this.onChange} name='name' value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> Three Company Name</label>
                  <input onChange={this.onChange} name='companyName' value={companyName} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Three City</label>
                  <input onChange={this.onChange} name='city' value={city} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> Three Ntn No</label>
                  <input onChange={this.onChange} name='ntn' value={ntn} type="number" class="form-control" id="exampleInputPassword1"/>
                </div>
               
                <button type="button" class="btn btn-primary" onClick={this.onSubmit}>Submit  </button>
              </form>
              </div>
          </div>
        </div>
    </div>
  );
}
}

//redux

const mapStateToProps = state => {
  console.log(state);
  return {
    regsitrationData: state,
    step: state.vendor.step==='stepTwo',
    shifter: state.vendor.tshifter==='stepThree',
    prevdata: state.vendor.dataForRegistration,
    storeId: state.auth.user.id,
    registrationComplete: state.vendor.registrationComplete
  }
}
export default connect(mapStateToProps,{stepThree})(StepThree);
