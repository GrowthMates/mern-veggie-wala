import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { logoutUser } from "../../../actions/authActions";
import { connect } from "react-redux";
import { Popover,
         PopoverHeader,
         PopoverBody,
         } from 'reactstrap';

const Example = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  // window.onclick(setPopoverOpen(false))
  const logout = () => {
    props.logoutUser()
    setPopoverOpen(false)
  }

  return (
    <div style={{position:'absolute'}}>
      {/* <Button id="Popover1" type="button">
        Launch Popover
      </Button> */}
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
  );
}

export default connect(null,{logoutUser})(Example);