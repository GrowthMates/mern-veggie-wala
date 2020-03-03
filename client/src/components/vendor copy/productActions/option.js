import React, {Component} from 'react';

class Option extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='container' >
                    <div className='row' >
                        <div className='col-2'  style={{marginTop: '20px'}} >
                          Purchase Note
                        </div>
                        <div className='col-10' >
                            <textarea style={{width: '30vw'}} ></textarea>
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          PReviews
                        </div>
                        <div className='col-10' style={{marginTop: '20px'}}>
                            <input type='checkbox'  /> <span>Enable Reviews</span>
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          Visibility
                        </div>
                        <div className='col-10' >
                               <div class="input-group mb-3">
                                    <select style={{height:'5vh',marginTop: '10px',width: '30vw'}} class="custom-select" id="inputGroupSelect01">
                                        <option selected>Category...</option>
                                        <option value="1">One</option>
                                        <option value="2">Two</option>
                                        <option value="3">Three</option>
                                    </select>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Option;