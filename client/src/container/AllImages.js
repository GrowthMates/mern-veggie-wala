import React,{Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {getAllImages} from '../actions/imageAction'
import {connect} from 'react-redux'

class AllImages extends Component{
componentDidMount(){
    this.props.getAllImages();
}

render(){
    return this.props.images.map(image=>{

        return(
            <div className='image-card-conatiner'>
                <div key={image.id} className='image-card'>
                    <h4 className='image-title'>{image.title}</h4>
                    <img
                    className='main-image'
                    src={image.image}
                    alt='Image desc'
                    />
                </div>
            </div>
        )
    })
}

}

const mapStateToProps=(state)=>{
    console.log('image map===',Object.values(state.imageReducer)[0]);
    return{
        images: Object.values(state.imageReducer)[0]
    }
}

export default connect(
    mapStateToProps,
    { getAllImages }
  )(AllImages);