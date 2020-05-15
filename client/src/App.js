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
import ForgotPassword from './components/login page/ForgotPassword';
import ResetPassword from './components/login page/ResetPassword';

function App() {
  return (
    <Router>
      <UserProvider>
        <Nav />
      <Switch>
        <Route exact path='/' component = { Home }></Route>
        
        <Route path='/planner'>
          <Planner />
        </Route>
        
        <Route path='/login'>
          <Login />
        </Route>
        
        <Route path='/profile'>
          <Profile />
        </Route>

        <Route path='/forgotpassword'>
          <ForgotPassword />
        </Route>

        <Route path='/resetpassword'>
          <ResetPassword />
        </Route>
        
        <Route exact path='/builds'>
          <BuildsProvider>
            <Builds />
          </BuildsProvider>
        </Route>

        <Route path='/builds/:id' component={BuildDetail} />
      
        <Route>
          Not Found
        </Route>
      
      </Switch>
      </UserProvider>
    </Router>
  );
}

export default App;
