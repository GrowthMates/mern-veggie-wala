import React from 'react';
import './style/register.css'
import { connect } from 'react-redux';
import {stepTwo} from '../../../store/actions/vendor/storeAction'
import StepThree from './stepThree'

let log = console.log
class StepTwo extends React.Component{ 
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

      let stepOnedata = {
      name,companyName,ntn ,city

      }

      let newData = this.props.prevdata;
      newData.push(stepOnedata);
      this.props.stepTwo(newData)
      // log(newArr)
    }

    componentWillReceiveProps(nextProps){
      log(nextProps)
      if(nextProps.tshifter===true){
        this.setState({
          success: true
        })
      }
    }
    render() {
      const {name,companyName,ntn,city} = this.state;
      if(this.state.success===true){
        return (
          <StepThree/>
        )
      }
  return (
    <div className=" ">
        <div className='container' >
          <div className='row' >
              <div className='col' >
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">second Name</label>
                  <input onChange={this.onChange} name='name' value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> second Company Name</label>
                  <input onChange={this.onChange} name='companyName' value={companyName} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">second City</label>
                  <input onChange={this.onChange} name='city' value={city} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1"> second Ntn No</label>
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
    tshifter: state.vendor.tshifter==='stepThree',
    prevdata: state.vendor.dataForRegistration
  }
}
export default connect(mapStateToProps,{stepTwo})(StepTwo);
