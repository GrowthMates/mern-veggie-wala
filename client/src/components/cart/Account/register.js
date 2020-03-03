import React from 'react';
import StepOne from './stepOne'
import StepTwo from './stepTwo'
import StepThree from './stepThree'
import './style/register.css'
import { connect } from 'react-redux';

class VendorRegister extends React.Component{ 
        state={
            stepOne: true,
            stepTwo: false,
            stepThree: false,
        }
  
        stepOne(){
            this.setState({
                stepOne: true,
                stepTwo: false,
                stepThree: false,
            })
        }

        stepTwo(){
            this.setState({
                stepOne: false,
                stepTwo: true,
                stepThree: false,
            })
        }
        stepThree(){
            this.setState({
                stepOne: false,
                stepTwo: false,
                stepThree: true,
            })
        }
    render() {
        console.log(this.props.shifter)
  return (
    <div className="myContainer ">
      <div className='row' >
          <div className='col' >
             <ul  className='vendorRegisterUl' >
                 <li onClick={this.stepOne.bind(this)} className={this.state.stepOne===true || this.props.shifter==='stepOne'? 'active': 'normal'} > 1</li>
                 <li onClick={this.stepTwo.bind(this)} className={this.state.stepTwo===true || this.props.shifter==='stepTwo'? 'active': 'normal'} > 2</li>
                 <li onClick={this.stepThree.bind(this)} className={this.state.stepThree===true || this.props.tshifter==='stepThree'? 'active': 'normal'} >3</li>
                 
             </ul>
             <div className='hrLine' ></div>
            <div>
             {this.state.stepOne!==false  && this.props.step==='stepOne'  ? (<StepOne/> )
             : this.state.stepTwo!==false &&  this.props.shifter==='stepTwo'?(<StepTwo/>)
             : this.state.stepThree!==false &&  this.props.tshifter==='stepThree' ?(<StepThree/>): void 0}
             </div>
          </div>
      </div>
    </div>
  );
}
}

// redux

const mapStateToProps = state => {
    return {
    shifter: state.vendor.shifter,        
    tshifter: state.vendor.tshifter,     
    step: state.vendor.step   
         
    }
}
export default connect(mapStateToProps,null)(VendorRegister);
