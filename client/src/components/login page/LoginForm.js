import React from 'react';
import axios from 'axios';

const LoginForm = ({ userData, setUserData, userInfo, setUserInfo }) => {
    const handleChange = e => {
        if (e.target.id === 'email') setUserData({...userData, loginEmail: e.target.value});
        if (e.target.id === 'password') setUserData({...userData, loginPassword: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.isLoggedIn === false) {
        const user = {
            email: userData.loginEmail,
            password: userData.loginPassword
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(user);
            const res = await axios.post('/api/users/auth', body, config);
            setUserInfo ({...userInfo, isLoggedIn: true, token: res.data.token});
            setUserData({...userData, loginSuccess: "Login Successful!", errorsLogin: []});
        } catch(err) {
            setUserData({...userData, errorsLogin: err.response.data.errors})
        }
        }
        else {
            setUserData({...userData, loginSuccess: "Already Logged In", errorsLogin: []});
        }

    }

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <h1 className="form-heading">I Already Have an Account</h1>
            <label htmlFor="email" className="form-label"><i className="fa fa-user-o icon"></i>Email</label>
            <input type="text" id="email" className="form-input" value={userData.loginEmail} onChange={handleChange} required/><br/>
            <label htmlFor="password" className="form-label"><i className="fa fa-lock icon"></i>Password</label>
            <input type="password" id="password" className="form-input" value={userData.loginPassword} onChange={handleChange} required/><br/>
            
            <div className='alert'>
                {userData.errorsLogin.map (error => <div key={error.msg}>{error.msg}</div>)}
            </div>
            <div className="success"> {userData.loginSuccess}</div>
            <input type="submit" value="Login" className="form-submit"/>
        </form>
    )
}

export default LoginForm;
