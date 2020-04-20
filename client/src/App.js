import React, {Suspense, lazy} from 'react';
import './App.css';
import Routes from './container/routing'

// const Routes = lazy(() => import('./container/routing'))

class App extends React.Component {
  
  render()
  {
    return (
    
    
    <div className="App">
      {/* <Suspense fallback={<div className='App-header'><h2>VeggieWala Loading...</h2></div>}> */}
        <Routes/>
      {/* </Suspense> */}
    </div>
  );}
 
}




export default App