import React, {Component} from 'react';

class Shipping extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <div className='container' >
                    <div className='row' >
                        <div className='col-2'  style={{marginTop: '30px'}} >
                          Weight (kg)
                        </div>
                        <div className='col-10' >
                            <input type='text' style={{width: '30vw',height: '5vh', marginTop: '30px'}} />
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          Dimension (cm)
                        </div>
                        <div className='col-10' style={{marginTop: '20px'}}>
                            <select>
                                <option selected>Length</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select>
                                <option selected>Width</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <select>
                                <option selected>Height</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                        </div>
                        <div className='col-2' style={{marginTop: '20px'}}>
                          Shipping Class
                        </div>
                        <div className='col-10' style={{marginTop: '20px'}}>
                             <select>
                                <option selected>Category...</option>
                                <option value="1">One</option>
                                <option value="2">Two</option>
                                <option value="3">Three</option>
                            </select>
                            <p>Shipping Classes are uses by certain Shipping methods to group similiar products</p>
                        </div>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Shipping;