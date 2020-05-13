import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Nav from './components/Nav';
import Builds from './components/build page/Builds';
import BuildDetail from './components/build page/BuildDetail';
import Login from './components/login page/Login';
import Planner from './components/planner page/Planner';
import Profile from './components/profile page/Profile';
import Home from './components/home page/Home';
import { BuildsProvider } from './components/build page/BuildsContext';
import { UserProvider } from './UserContext';

function App() {
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path='/' component = { Home }></Route>
        
        <Route path='/builds/:id'>
          <UserProvider>
            <BuildDetail />
          </UserProvider>
        </Route>
        
        <Route path='/planner'>
          <UserProvider>
            <Planner />
          </UserProvider>
        </Route>
        
        <Route path='/login'>
          <UserProvider>
            <Login />
          </UserProvider>
        </Route>
        
        <Route path='/profile'>
        <UserProvider>
            <Profile />
          </UserProvider>
        </Route>
        
        <Route exact path='/builds'>
          <BuildsProvider>
            <Builds />
          </BuildsProvider>
        </Route>
      
      </Switch>
    </Router>
  );
}

export default App;
