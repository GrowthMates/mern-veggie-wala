import React from 'react';
import {connect} from "react-redux" 
import {createReview} from "../../../actions/productsAction"
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField'
import MakeRating from "./changeableRating"

function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [review, setReview] = React.useState('');
  const [star, setStar] = React.useState(0);
  

  const handleClickOpen = () => {
    setOpen(true);
  };

  
  const submitReview = () => {
    const data = {
      id:"5ec6889c2c0f7f2b88676775",
      star,
      review
    }
    console.log(data)
    // props.createReview(data)
    setOpen(false);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Give Reviews
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Rate the Product and give Reviews"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <MakeRating handleStar={(value) => setStar(value)}/>
            {/* Type Reviews */}
          <TextField id="standard-basic" label="Review" onChange={(e) => setReview(e.target.value)}/>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          
          <Button onClick={submitReview} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


export default connect(null,{createReview})(AlertDialog)