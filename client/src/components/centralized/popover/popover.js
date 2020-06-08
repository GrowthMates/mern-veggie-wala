import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import { Popover,
         PopoverHeader,
         PopoverBody,
         Button
         } from 'reactstrap';

const Example = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);
  console.log(popoverOpen)
  const toggle = () => setPopoverOpen(!popoverOpen);
  // window.onclick(setPopoverOpen(false))
  const logout = () => {
    props.logoutUser()
    setPopoverOpen(false)
  }

  return (
    <React.Fragment>
      <img src={props.imgSrc} id="Popover1" type="button" width='20' height='20.52'/>
       <div style={{position:'absolute'}}>
      <Popover placement="right" isOpen={popoverOpen} target="Popover1" toggle={toggle} style={{maxWidth:'185px'}}>
        <PopoverHeader>User</PopoverHeader>
        <PopoverBody style={{padding:'.5rem 0'}}>
        
        {props.user.id?
          <ul id='popover-list'>
            <li onClick={()=>{setPopoverOpen(false)}}>Account</li>
            <li onClick={()=>logout()}>Logout</li>
          </ul>
        : (
          <ul id='popover-list'>
            <Link to='/user/login' style={{textDecoration:'none'}}><li onClick={()=>{setPopoverOpen(false)}}>Login</li></Link>
            <Link to='/user/sign-up'><li onClick={()=>{setPopoverOpen(false)}}>Sign Up</li></Link>
          </ul>
        )
        }
        
      {/* </ListGroup> */}
        </PopoverBody>
      </Popover>
    </div>
    </React.Fragment>
  );
}

export default connect(null,{logoutUser})(Example);