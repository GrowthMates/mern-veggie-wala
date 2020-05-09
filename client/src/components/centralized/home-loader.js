import React from 'react'
import './style/home.css'


export default function HomeLoader(){
    return (
        <div className='container' style={{marginTop: '25px'}} >
         <div className='row '>
             <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
            <br/>
            <div className='loaders'></div>
            <br/>
            <br/>
            <h5  >Name ......</h5>
              <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
              </div>

              <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
      <br/>
      <div className='loaders'></div>
      <br/>
      <br/>
      <h5  >Name ......</h5>
        <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
        </div>

        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
      <br/>
      <div className='loaders'></div>
      <br/>
      <br/>
      <h5  >Name ......</h5>
        <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
        </div>

        <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
      <br/>
      <div className='loaders'></div>
      <br/>
      <br/>
      <h5  >Name ......</h5>
        <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
        </div>  
          </div>
        </div>
    )
}

