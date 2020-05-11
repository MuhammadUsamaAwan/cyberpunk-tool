import React from 'react';
import './Login.css'

const Login = () => {
    return (
        <div className="container">
            <form className="login-form">
                <h1 className="form-heading">I Already Have an Account</h1>
                <label htmlFor="email" className="form-label"><i className="fa fa-user-o icon"></i>Email</label>
                <input type="text" name="email" id="email" className="form-input"/><br/>
                <label htmlFor="password" className="form-label"><i className="fa fa-lock icon"></i>Password</label>
                <input type="password" name="password" id="password" className="form-input"/><br/>
                <input type="submit" value="Login" className="form-submit"/>
            </form>

            <form className="signup-form">
            <h1 className="form-heading">I Want to Create an Account</h1>
                <label htmlFor="name" className="form-label"><i className="fa fa-user-circle icon"></i>Username</label>
                <input type="text" name="name" id="name" className="form-input"/><br/>
                <label htmlFor="email" className="form-label"><i className="fa fa-user-o icon"></i>Email</label>
                <input type="text" name="email" id="email" className="form-input"/><br/>
                <label htmlFor="password" className="form-label"><i className="fa fa-lock icon"></i>Password</label>
                <input type="password" name="password" id="password" className="form-input"/><br/>
                <label htmlFor="password2" className="form-label"><i className="fa fa-lock icon"></i>Confirm Password</label>
                <input type="password" name="password2" id="password2" className="form-input"/><br/>
                <input type="submit" value="Sign Up" className="form-submit"/>
            </form>
        </div>
    )
}

export default Login
