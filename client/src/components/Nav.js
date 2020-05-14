import React, { useContext } from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Nav = () => {
    const [userInfo] = useContext(UserContext);
    if (userInfo.isLoggedIn === false) {
        return (
            <nav className="navbar">
                <NavLink exact to='/' className="bars home" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Home</NavLink>
                <NavLink to='/planner' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Planner</NavLink>
                <NavLink exact to='/builds' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Builds</NavLink>
                <NavLink to='/login' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Login</NavLink>
            </nav>
        )
    }
    else {
        return (
            <nav className="navbar">
                <NavLink exact to='/' className="bars home" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Home</NavLink>
                <NavLink to='/planner' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Planner</NavLink>
                <NavLink exact to='/builds' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Builds</NavLink>
                <NavLink to='/profile' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Profile</NavLink>
            </nav>
        )
    }
}

export default Nav;
