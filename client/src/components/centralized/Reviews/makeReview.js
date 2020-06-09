import React ,{useState}from 'react';
import {connect} from "react-redux" 
import {createReview} from "../../../actions/productsAction"
import MakeRating from "./changeableRating"

function AlertDialog(props) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [star, setStar] = React.useState(0);
  const [reviewTitle, setReviewTitle] = useState('')
  const [review, setReview] = React.useState('');
  const [error, setError] = React.useState('');

  
  
  const submitReview = () => {
     if(!customerName || !customerEmail || !star>0 || !reviewTitle || !review){
       setError("*All fields are Required*")
     }
     else{
       const data = {
         id:props.productId,
         customerName,
         customerEmail,
         star,
         reviewTitle,
         review
       }
       console.log(data)
       props.createReview(data)

     }
  };
 

  return (
    
      <div className='card card-body row' style={{margin:'10px'}}>
          {error?
           <div className='col-12' style={{border:'1px solid #d96673', paddingTop:'15px'}}>
               <p style={{color:'red'}}>{error}</p>
            </div> : void 0
          }
           <div className='col-12'>
                <label for="rating-stars">Rating</label>
                <MakeRating handleStar={(value) => setStar(value)}/>
            </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Name</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" name='customerName' placeholder="Example: John Doe" onChange={(e)=> {setError(''); setCustomerName(e.target.value)}} />
             </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Email</label>
                  <input type="email" className="form-control" id="exampleInputPassword1" name='customerEmail' placeholder="john.smith@example.com" onChange={(e)=> {setError(''); setCustomerEmail(e.target.value)}} />
             </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Review Title</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" name='reviewTitle' placeholder="Give your review a Title" onChange={(e)=> {setError(''); setReviewTitle(e.target.value)}} />
             </div>
              <div className='col-12'>
                <label for="exampleFormControlTextarea1">Your Review </label>
                 <textarea placeholder='Type your review here' className="form-control" id="exampleFormControlTextarea1" name='review' rows="10"  onChange={(e) => {setError(''); setReview(e.target.value)}}></textarea>
               </div>
                <div className='review-send-div col-12 forCenter'>
                    <button type="button" className="review-send-btn" onClick={submitReview}>Submit</button>
                 </div>
                                   
                        
          </div>
     
  );
}


export default connect(null,{createReview})(AlertDialog)