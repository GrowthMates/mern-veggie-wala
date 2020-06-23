import React ,{useState}from 'react';
import {connect} from "react-redux" 
import MakeRating from "./changeableRating"
import ButtonSpinner from "../buttonSpinner"
import Axios from 'axios';

function AlertDialog(props) {
  const [customerName, setCustomerName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')
  const [star, setStar] = useState(0);
  const [reviewTitle, setReviewTitle] = useState('')
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');


  const createReview = (data)  => {
    console.log("Review Generate----",data)
    setLoading(true)
    Axios.post(`/api/review/make/${data.id}`,data).then((res) => {
      if(res.data){
        clearState()
        console.log('Reviews done----',res.data)
      }
    }).catch(err => {
      console.log(err)
      setLoading(false)
    })
    
  
  }  
  
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
       
       // Call API..
       createReview(data)


     }
  }
 
  const clearState = () => {
    console.log('clearStatwe-----')
    setCustomerName("");
    setCustomerEmail("");
    setStar(0);
    setReviewTitle("");
    setReview("");
    setLoading(false);
    setError("");
  }

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
                  <input type="text" className="form-control" id="exampleInputPassword1" value={customerName} name='customerName' placeholder="Example: John Doe" onChange={(e)=> {setError(''); setCustomerName(e.target.value)}} />
             </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Email</label>
                  <input type="email" className="form-control" id="exampleInputPassword1" value={customerEmail} name='customerEmail' placeholder="john.smith@example.com" onChange={(e)=> {setError(''); setCustomerEmail(e.target.value)}} />
             </div>
             <div className='col-12'>
                 <label for="exampleInputPassword1">Review Title</label>
                  <input type="text" className="form-control" id="exampleInputPassword1" value={reviewTitle} name='reviewTitle' placeholder="Give your review a Title" onChange={(e)=> {setError(''); setReviewTitle(e.target.value)}} />
             </div>
              <div className='col-12'>
                <label for="exampleFormControlTextarea1">Your Review </label>
                 <textarea placeholder='Type your review here' className="form-control" id="exampleFormControlTextarea1" value={review} name='review' rows="10"  onChange={(e) => {setError(''); setReview(e.target.value)}}></textarea>
               </div>
                <div className='review-send-div col-12 forCenter'>
                  {loading ? 
                  <button type="button" className="review-send-btn" disabled style={{curson:"not-allowed"}}><ButtonSpinner/></button> 
                  :
                  <button type="button" className="review-send-btn" onClick={submitReview}>Submit</button>
                  }

                 </div>
                                   
                        
          </div>
     
  );
}


export default AlertDialog