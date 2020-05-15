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

  return (
    <div style={{position:'absolute'}}>
      {/* <Button id="Popover1" type="button">
        Launch Popover
      </Button> */}
      <Popover placement="right" isOpen={popoverOpen} target="Popover1" toggle={toggle} style={{maxWidth:'185px'}}>
        <PopoverHeader>User</PopoverHeader>
        <PopoverBody>
        
        {props.user?
        <ListGroup>
           {/* <ListGroupItem ><link to='/user/logout'>Logout</link> </ListGroupItem>
          <ListGroupItem > <link to='/user/account'>Account</link> </ListGroupItem> */}
        </ListGroup>
        : (
        <ListGroup>
           {/* <ListGroupItem ><link to='/user/login'>Login</link> </ListGroupItem>
           <ListGroupItem ><link to='/user/sign-up'>Sign Up</link> </ListGroupItem> */}
        </ListGroup>)
        }
        
      {/* </ListGroup> */}
        </PopoverBody>
      </Popover>
    </div>
  );
}

export default Example;