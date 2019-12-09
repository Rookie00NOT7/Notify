import React,{ Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Signup from './components/signup'
import Login from './components/login'

class App extends Component {

  render() {
    
    return (
      <Router>
        <Route exact path="/" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        
      </Router>
    );
  }
}
export default App;
