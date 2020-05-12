// import React from 'react'
// import './style/home.css'


// export default function HomeLoader(){
//     return (
//         <div className='container' style={{marginTop: '25px'}} >
//          <div className='row '>
//              <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
//             <br/>
//             <div className='loaders'></div>
//             <br/>
//             <br/>
//             <h5  >Name ......</h5>
//               <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
//               </div>

//               <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
//       <br/>
//       <div className='loaders'></div>
//       <br/>
//       <br/>
//       <h5  >Name ......</h5>
//         <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
//         </div>

//         <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
//       <br/>
//       <div className='loaders'></div>
//       <br/>
//       <br/>
//       <h5  >Name ......</h5>
//         <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
//         </div>

//         <div className='col-lg-3 col-md-6 col-sm-12 col-xs-12 p1'  >
//       <br/>
//       <div className='loaders'></div>
//       <br/>
//       <br/>
//       <h5  >Name ......</h5>
//         <h5 style={{textAlign: 'left', fontWeight: '300' , marginBottom: '10px'}} >Rs......</h5>
//         </div>  
//           </div>
//         </div>
//     )
// }


//===================================================================//

import React from 'react'
import ContentLoader from 'react-content-loader'

const Catalog = props => (
  <ContentLoader
    viewBox="0 0 1360 900"
    height={900}
    width={1360}
    speed={2}
    {...props}
  >
    <rect x="30" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="30" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="30" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="250" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="250" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="250" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="470" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="470" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="470" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="690" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="690" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="690" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="910" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="910" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="910" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="1130" y="20" rx="8" ry="8" width="200" height="200" />
    <rect x="1130" y="250" rx="0" ry="0" width="200" height="18" />
    <rect x="1130" y="275" rx="0" ry="0" width="120" height="20" />
    <rect x="30" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="30" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="30" y="595" rx="0" ry="0" width="120" height="20" />
    <rect x="250" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="250" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="250" y="595" rx="0" ry="0" width="120" height="20" />
    <rect x="470" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="470" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="470" y="595" rx="0" ry="0" width="120" height="20" />
    <rect x="690" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="690" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="690" y="595" rx="0" ry="0" width="120" height="20" />
    <rect x="910" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="910" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="910" y="595" rx="0" ry="0" width="120" height="20" />
    <rect x="1130" y="340" rx="8" ry="8" width="200" height="200" />
    <rect x="1130" y="570" rx="0" ry="0" width="200" height="18" />
    <rect x="1130" y="595" rx="0" ry="0" width="120" height="20" />
  </ContentLoader>
)

Catalog.metadata = {
  name: 'Afrizal Fikri',
  github: 'koneko096', // Github username
  description: 'Catalog',
  filename: 'Catalog', // filename of your loader
}

export default Catalog



