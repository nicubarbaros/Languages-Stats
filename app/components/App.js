import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'; 

import Battle from './Battle';
import Home from './Home';
import Nav from './Nav';
import Popular from './Popular';

class App extends Component {
  render() {
    return (
      <Router>
        <div className='container'>
          <Nav/>
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/battle' component={Battle}/>
            <Route path='/popular' component={Popular}/>
            <Route render={function () {
              return <p> 404 Page </p>
            }} />
          </Switch>
        </div>  
      </Router>
    )
  }
}

export default App;