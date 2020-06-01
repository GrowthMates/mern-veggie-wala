import React, { useState } from 'react';

const category = ['All', 'Vegetable', 'Fruit' ]
const price = [
    '0.00 - 99.99',
     '100.00 - 199.99',
      '200.00 - 299.99',
      '300.00 - 399.99',
      '400.00 - 499.99',
      '500.00 And Above',
     ]


const Filteration = (props) => {
    const {obj} =  props
     const topic = obj==='category'?category:price


     const [Checked, setChecked] = useState([])

     const handleToggle = (value) => {
        const currentIndex = Checked.indexOf(value)
        const newChekced = [...Checked]

        if(currentIndex===-1){
            newChekced.push(value)

        }else {
            newChekced.splice(currentIndex, 1)
        }

        setChecked(newChekced)
        props.handleFilters(newChekced)
     }

console.log(Checked)
    return ( 
        <div>
            {topic.map((item,index) => 
            <React.Fragment>
                <div className="form-check">
                <input className="form-check-input position-static cursor-pointer" 
                type="checkbox" 
                id="blankCheckbox"
                value="option1" 
                aria-label="..." 
                checked={Checked.indexOf(item)!==-1?true:false}
                onChange={() => handleToggle(item)}
                
                />
                
                <li className="side-list-items cursor-pointer" 
                style={Checked.indexOf(item)!==-1?{color:'#5BA616',textDecoration:'underline',transition:'0.25s'}:void 0} 
                onClick={() => handleToggle(item)}>
                    {item}
                    </li></div><hr/>
                </React.Fragment>)}
        </div>
     );
}
 
export default Filteration;