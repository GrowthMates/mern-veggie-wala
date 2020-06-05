import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import store from '../../store';
import {openNote} from "../../actions/productsAction"
import {connect} from "react-redux"

function AlertDialog(props) {
  const [open, setOpen] = React.useState(props.openNote);
  console.log('ThankYou NOte----',open)
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
      store.dispatch(openNote(false))
    setOpen(false);
  };

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Thank you for your Order"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Disagree
          </Button> */}
          <Button onClick={handleClose} color="primary" autoFocus>
            Ok
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
    return{ 
        openNote: state.products.openNote
    }
     
}

export default connect(mapStateToProps,null)(AlertDialog)