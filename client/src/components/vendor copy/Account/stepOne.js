import React from 'react';
import './style/register.css'
import { connect } from 'react-redux';
import {stepOne} from '../../../store/actions/vendor/storeAction'
import StepTwo from './stepTwo'

let log = console.log
class StepOne extends React.Component{ 
        state={
          name: '',
          companyName: '',
          ntn: '',
          city:'',
          success: false
        }
  
        onChange=e => this.setState({[e.target.name]: e.target.value})

    onSubmit = e => {
      let newArr = []
      e.preventDefault();

      const {name,companyName,ntn,city} = this.state

      let stepOnedata = {
      name,companyName,ntn ,city

      }

      newArr.push(stepOnedata);
      this.props.stepOne(newArr,this.props.history)
      log(newArr)
    }

    componentWillReceiveProps(nextProps){
      if(nextProps.step===true){
        this.setState({
          success: true
        })
      }
    }
    render() {
      const {name,companyName,ntn,city} = this.state;
      if(this.state.success===true){
        return (
          <StepTwo/>
        )
      }
  return (
    <div className=" ">
        <div className='container' >
          <div className='row' >
              <div className='col' >
              <form>
                <div class="form-group">
                  <label for="exampleInputEmail1">Name</label>
                  <input onChange={this.onChange} name='name' value={name} type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Company Name</label>
                  <input onChange={this.onChange} name='companyName' value={companyName} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">City</label>
                  <input onChange={this.onChange} name='city' value={city} type="text" class="form-control" id="exampleInputPassword1"/>
                </div>
                <div class="form-group">
                  <label for="exampleInputPassword1">Ntn No</label>
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
    step: state.vendor.step==='stepOne'
  }
}
export default connect(mapStateToProps,{stepOne})(StepOne);
