import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

class TestComp extends Component{
    constructor(Props){
        super(Props);
        this.state={
            
        }
    }
    render(){
        return(
            <div>
                <h1>Testing Component</h1>
            </div>
        )
    }
}
export default TestComp;