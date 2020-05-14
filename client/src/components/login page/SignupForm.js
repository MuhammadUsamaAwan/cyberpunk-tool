import React, { useState } from 'react';
import axios from 'axios';
import Recaptcha from 'react-recaptcha';

const SignupForm = ({ userData, setUserData, userInfo, setUserInfo }) => {
    const [verifyHuman, setVerifyHuman] = useState(false);
    const handleChange = e => {
        if (e.target.id === 'signupemail') setUserData({...userData, email: e.target.value});
        if (e.target.id === 'signuppassword') setUserData({...userData, password: e.target.value});
        if (e.target.id === 'name') setUserData({...userData, name: e.target.value});
        if (e.target.id === 'password2') setUserData({...userData, password2: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.isLoggedIn === false) {
        if (userData.password !== userData.password2) setUserData({...userData, errorsSignup: [{msg: 'Passwords do not match'}]})
        else if (verifyHuman === false) setUserData({...userData, errorsSignup: [{msg: 'Please verify that you are human'}]})
        else {
            const user = {
                email: userData.email,
                name: userData.name,
                password: userData.password
            }
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
                const body = JSON.stringify(user);
                const res = await axios.post('/api/users/', body, config);
                setUserInfo ({...userInfo, isLoggedIn: true, token: res.data.token});
                setUserData({...userData, signupSuccess: "Sigup Successful!", errorsSignup: []});
                window.location.replace("/");
            } catch(err) {
                setUserData({...userData, errorsSignup: err.response.data.errors})
            }
        }
        }
        else {
            setUserData({...userData, signupSuccess: "Already Logged In", errorsSignup: []});
        }
    }

    const verifyCallback = () => {
        setVerifyHuman(true);
    }
    const expiredCallback = () => {
        setVerifyHuman(false);
    }

    return (
        <form className="signup-form" onSubmit={handleSubmit}>
            <h1 className="form-heading">I Want to Create an Account</h1>
            <label htmlFor="name" className="form-label"><i className="fa fa-user-circle icon"></i>Username</label>
            <input type="text" id="name" className="form-input" value={userData.name} onChange={handleChange} required/><br/>
            <label htmlFor="signupemail" className="form-label" ><i className="fa fa-user-o icon"></i>Email</label>
            <input type="text" id="signupemail" className="form-input" value={userData.email} onChange={handleChange} required/><br/>
            <label htmlFor="signuppassword" className="form-label"><i className="fa fa-lock icon"></i>Password</label>
            <input type="password" id="signuppassword" className="form-input" value={userData.password} onChange={handleChange} required/><br/>
            <label htmlFor="password2" className="form-label"><i className="fa fa-lock icon"></i>Confirm Password</label>
            <input type="password" id="password2" className="form-input" value={userData.password2} onChange={handleChange} required/><br/>

            <div className='alert'>
                {userData.errorsSignup.map (error => <div key={error.msg}>{error.msg}</div>)}
            </div>
            <div className="success"> {userData.signupSuccess}</div>
            <div className="recaptcha">
            <Recaptcha 
                sitekey="6LdXFfcUAAAAADxbTZEZ4-vwouOQCAHC0FX4t3Hm"
                render="explicit"
                verifyCallback={verifyCallback}
                expiredCallback={expiredCallback}
                theme="dark"
            /></div>
            <input type="submit" value="Sign Up" className="form-submit"/>
        </form>
    )
}

export default SignupForm;
