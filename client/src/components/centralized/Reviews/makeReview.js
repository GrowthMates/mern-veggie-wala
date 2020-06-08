import React ,{useState}from 'react';
import {connect} from "react-redux" 
import {createReview} from "../../../actions/productsAction"
import MakeRating from "./changeableRating"

function AlertDialog(props) {
  const [review, setReview] = React.useState('');
  const [star, setStar] = React.useState(0);
  const [reviewTitle, setReviewTitle] = useState('')

  
  
  const submitReview = ({productId}) => {
    const data = {
      id:productId,
      star,
      reviewTitle,
      review
    }
    console.log(data)
    // props.createReview(data)
  };
 

  return (
    
      <div className='row'>
           <div className='col-12'>
                <label for="rating-stars">Rating</label>
                <MakeRating handleStar={(value) => setStar(value)}/>
            </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Review Title</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" name='reviewTitle' placeholder="Give your review a Title" onChange={(e)=>setReviewTitle(e.target.value)} />
             </div>
              <div className='col-12'>
                <label fo r="exampleFormControlTextarea1">Your Review </label>
                 <textarea placeholder='Type your review here' className="form-control" id="exampleFormControlTextarea1" name='review' rows="10"  onChange={(e) => setReview(e.target.value)}></textarea>
               </div>
                <div className='review-send-div'>
                    <button type="button" className="review-send-btn" onClick={submitReview}>Submit</button>
                 </div>
                                   
                        
          </div>
     
  );
}


export default connect(null,{createReview})(AlertDialog)