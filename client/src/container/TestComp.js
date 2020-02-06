// import React,{Component} from 'react';
// import {Link, withRouter} from 'react-router-dom';
// // import {addImage} from '../actions/imageAction'
// import {connect} from 'react-redux'
// // import socketIOClient from "socket.io-client";


// // var socket = socketIOClient("http://localhost:5000");
// class TestComp extends Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//         title: "",
//         image: ""
//        };
//        this.onChangeTitle = this.onChangeTitle.bind(this);
//        this.onChangeImage = this.onChangeImage.bind(this);
//        this.onSubmit = this.onSubmit.bind(this);
//     }
//     componentDidMount(){
//         // this.socket = socketIOClient("http://localhost:5000");
//         // this.socket.emit("initial_data");
//         // console.log('Initial data emitted===')
//         // console.log('testing component Submit Button===')
//         // this.socket.on("get_data",function(data){
//         //     console.log('data delivered====', data)
//         // })
//     }
//     // componentWillUnmount() {
//     //     socket.off("get_data");
//     // }
//     getData = foodItems => {
//         console.log(foodItems);
     
//       };
//       onChangeTitle = e => {
//         this.setState({ title: e.target.value });
//         };
//        onChangeImage = e => {
//         this.setState({ image: e.target.files[0] });
//         };
//        onSubmit(e) {
//        e.preventDefault();
//        let formData = new FormData();
//        formData.append("product","Apple Aya h")
//        formData.append("title", this.state.title);
//        formData.append("image", this.state.image);
//        this.props.addImage(formData);
//        console.log('Image Submit====',formData)
//        this.setState({
//        title: "",
//        image: ""
//        });
//       }
//        render() {
//         return (
//         <div className="form-container">
//         <form encType="multipart/form-data" onSubmit={this.onSubmit}> 
//         <h2>Image Form</h2>
//         <label className="form-label">Image Title</label>
//         <input 
//         className="form-input"
//         placeholder="Enter Image Title"
//         type="text"
//         value={this.state.title}
//         onChange={this.onChangeTitle}
//         />
//         <label className="form-label">Choose an Image</label>
//        <input type="file" 
//        className="form-input"
//        onChange={this.onChangeImage} />
//        <button type="submit" className="submit-btn">Submit!</button>
//        </form>
//        </div>
//        );
//          }
//        }
// export default connect(null,{ addImage })(TestComp);