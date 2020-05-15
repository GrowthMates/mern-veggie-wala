import React,{Component} from 'react';
// import 'date-fns';
// import Grid from '@material-ui/core/Grid';
// // import DateFnsUtils from '@date-io/date-fns';
// import {
//   MuiPickersUtilsProvider,
//   KeyboardTimePicker,
//   KeyboardDatePicker,
// } from '@material-ui/pickers';
import {connect} from 'react-redux'
import './style/sales.css'

let log = console.log
class sales extends Component {
    constructor(props) {
        super(props);
        this.state = { orders:undefined,carts:undefined,selectedDate:undefined,date:undefined }
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value })
    componentDidMount() {
        if(this.props.carts){
            this.setState({
                carts:this.props.carts

            }) 
        }
        else{
            this.setState({
                date:this.props.carts
            })
        }}
        
        // axios.get("http://localhost:5000/api/getOrders")
        // .then(res => {
        //     log(res.data);
        //     this.setState({
        //         orders:res.data
        //     })
        // })
    
    render() { 
        let filtered=[]
        // log(this.state)
       if(this.state.selectedDate!==undefined){
        let split = this.state.selectedDate.split('-')
        let day = split[2]
        let month = split[1]
        let year = split[0]
        let arr = []

        // log(day)
        // day.toString()
        // if(day='01'){
        //     day=10
        // }
        // log()

       if(this.state.selectedDate!==undefined && this.state.date !== undefined){
        let arr = [day,month,year]
        
        arr.forEach((e,ind) => {
            // newarr.push(e);

            // if(arr[ind].charAt(0))
            if(e.charAt(0) !== '0'){
                let newarr = []

                let joined = arr.join('-')
                log(joined)
                // newarr.push(e);
                // let pre = newarr.join('-')
                newarr.push(joined.charAt(0)==='0' ? joined.charAt(1) : joined.substr(0,2),joined.charAt(3)==='0' ? joined.charAt(4): joined.substr(3,2),joined.substr(6,4))
                log(newarr)
                // yahan par wo date aygi jis men shuru men 0 nahi hoga  ("_")

                 this.state.date.filter(i => {
                    if(i.orders){
                        // let filteredDate = []
                        let filteredDate = i.orders.filter(el => {
                             if(el.timeStamp!==undefined ){
                                //  let d = e.timeStamp;
                                // let joined = arr.join('-')
                                // let pre = newarr.join('-')
                                // let slicing = pre.slice(0,9)
                                let elJoined = el.timeStamp.split(' ')[1]
                                let newarrJoined = newarr.join('-')
                                log(newarrJoined,elJoined)
                                // log(typeof newarrJoined,typeof elJoined)
                                // if(newarrJoined==elJoined){

                                // }
                                return  newarrJoined == elJoined
                             }
                            
                        })
                    log(filteredDate )
                    }
                 })
                // arr.push({day:e[i1]  })
                
            }
         
        });
    }
        // let concat = arr.join('-')
        // log(newarr)

        // let filtered = [];
        if(this.state.date!==undefined){
                //  this.state.date.forEach(i => {
                //      if(i.orders){
                //         let filteredDate = []
                //          i.orders.filter(e => {
                //              if(e.timeStamp!==undefined ){
                //                 //  let d = e.timeStamp;
                //                 return  e.timeStamp.split(' ')[1]=== 27-2-2020 ? filteredDate.push(e.timeStamp.split(' ')[1] ) : log('failed')
                //              }
                            
                //         })
                //     log(filteredDate )
                //     }
                // })

                // log(abhi)
            // filtered= this.state.carts.filter(e => {new Date(a.startDate) - new Date > 0})
        }
       }
        // log( 'cart vise => ' ,filtered,this.state.carts)
      
        return ( 
            <div style={{padding: '10px 30px'}} >
                <div className='row' >
                    <ul className='ordersUl' >
                        <li>ALl (3) </li>
                        <li>Completed (2) </li>
                        <li>Processing (7) </li>
                        <li>On-hold (0) </li>
                        <li>Pending (8) </li>
                        <li> Canceled (0) </li>
                        <li> Refund (0) </li>
                    </ul>
                </div>

                <div className='row' >
                    <div className='col' >
                     {/* <input type='date' /> */}

                    </div>
                    <div className='col' >
                     {/* <input type='date' value={this.state.selectedDate} onChange={(e)=>this.setState({ selectedDate:e.target.value })} /> */}
                        {/* <KeyboardDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="normal"
                        id="date-picker-inline"
                        label="Date picker inline"
                        value={this.stat.selectedDate}
                        // onChange={handleDateChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }} */}
                        {/* /> */}
                    </div>
                </div>
                <p> {this.state.selectedDate} </p>
                <div className='row' >
                    <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Order</th>
                            <th scope="col">Order Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Customer</th>
                            <th scope="col">Customer No </th>
                            <th scope="col">Address</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { filtered.length>=1 ? 
                            (filtered.map((item,index) => {
                                return item.orders.map((i,ind) => {
                                    return (
                                        <tr key={ind} >
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>{i.number}</td>
                                <td>{item.address}</td>
                                <td>15-feb-2020</td>
                                <td  ><i style={{border: '1px solid black', padding: '10px',textAlign: 'center'}} class="fa fa-eye"></i></td>
                                </tr>
                                    )
                                })
                           })
                            ) :
                                !this.state.carts ? <p>Loading......</p> : 
                           (this.state.carts.map((item,index) => {
                                return item.orders.map((i,ind) => {
                                     return i.status==='complete' ? (
                                         
                                        <tr key={ind} >
                                {/* <th> {index+1} </th> */}
                                <th scope="row" style={{color: '#FF4747'}} > Order #1310  </th>
                                <td>PKR 2300</td>
                                <td  > <span style={{textAlign: 'center', backgroundColor: '#28A745',padding: '10px', color: '#ffffff', fontWeight: '600'}}> {i.status} </span> </td>
                                <td>{i.fname}</td>
                                <td>{i.number}</td>
                                <td>{item.address}</td>
                                <td>15-feb-2020</td>
                                {/* <td  >  {(filtered.leng * 100) / (item.orders.length) } </td> */}
                                </tr>
                                    ) : void 0
                                })
                           })
                            )
                            }
                           
                        </tbody>
                    </table>
                </div>
            </div>
         );
    }
}
 
// redux

const mapStateToprops = state => {
    log(state.cartReducer.getCarts)
    return{
        carts: state.cartReducer.getCarts
    }
}
export default connect(mapStateToprops,null)(sales);