import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Popover,
         PopoverHeader,
         PopoverBody,
         ListGroup,
         ListGroupItem } from 'reactstrap';

const Example = (props) => {
  const [popoverOpen, setPopoverOpen] = useState(false);

  const toggle = () => setPopoverOpen(!popoverOpen);
  // window.onclick(setPopoverOpen(false))

  return (
    <div style={{position:'absolute'}}>
      {/* <Button id="Popover1" type="button">
        Launch Popover
      </Button> */}
      <Popover placement="right" isOpen={popoverOpen} target="Popover1" toggle={toggle} style={{maxWidth:'185px'}}>
        <PopoverHeader>User</PopoverHeader>
        <PopoverBody style={{padding:'.5rem 0'}}>
        
        {props.user?
          <ul id='popover-list'>
            <li>Account</li>
            <li>Logout</li>
          </ul>
        : (
          <ul>
            <li>Login</li>
            <li>Sign Up</li>
          </ul>
        )
        }
        
      {/* </ListGroup> */}
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default Example;