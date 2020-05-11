import React from 'react';
import './Nav.css';
import { NavLink } from 'react-router-dom';

const Nav = () => {
    return (
        <nav className="navbar">
            <NavLink exact to='/' className="bars home" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Home</NavLink>
            <NavLink to='/planner' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Planner</NavLink>
            <NavLink to='/builds' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Builds</NavLink>
            <NavLink to='/login' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Login</NavLink>
            <NavLink to='/profile' className="bars" activeStyle={{color: '#E90848', backgroundColor: '#E90848'}}><br />Profile</NavLink>
        </nav>
    )
}

export default Nav;
