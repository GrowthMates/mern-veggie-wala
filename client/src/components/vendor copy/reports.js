import React,{Component} from 'react';
import './style/reports.css'

class Reports extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div style={{backgroundColor: '#f8f6f6'}} >
                <div className='row' >
                   <ul className='reportsUl' >
                        <li>Overview </li>
                        <li>Sales by day </li>
                        <li>Top Sellers </li>
                        <li> Top earners </li>
                        
                    </ul>
                </div>

                <div className='row' >
                    
                </div>
            </div>
         );
    }
}
 
export default Reports;