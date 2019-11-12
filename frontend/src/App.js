import React, { useState } from 'react'
import Home from './components/Home'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import PairDetailed from './components/PairDetailed'

const App = () => {


  const [kvlist, setKvlist] = useState([])

  const findPairById = (id) => kvlist.filter(item => item.key === id)
  
   return (
    <Router>
      <div className='container'>
        <div className='row'>
          <div className='col-md-15'>
            <br></br>
            <br></br>
            <h1>Key-Value Store</h1>
            </div>
        </div>
      </div>
      <Route exact path='/' render={(props) => <Home {...props} kvlist={kvlist} handlelist={setKvlist}/>} />
      <Route exact path='/:id' render={({ match, ...props }) => <PairDetailed {...props}  pair={findPairById(match.params.id)}/>} />           
    </Router>
  )
}


export default App;
