import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const ResetPassword = () => {
    const [userInfo] = useContext(UserContext);
    const [state, setState] = useState({password:"", password2:"", token:"", errors:[], success:""})
    const history = useHistory();
    if (userInfo.isLoggedIn) history.push('/');

    const handleChange = e => {
        if(e.target.id === "resetPassword")
        setState({...state, password: e.target.value})
        if(e.target.id === "resetPassword2")
        setState({...state, password2: e.target.value})
        if(e.target.id === "token")
        setState({...state, token: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.password !== state.password2) setState({...state, errors: [{msg: 'Passwords do not match'}]})
        else if (userInfo.isLoggedIn === false) {
        const user = {
            password: state.password,
            token: state.token
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(user);
            const res = await axios.post('/api/users/resetpassword', body, config);
            setState({...state, success: res.data, errors:[]})
        } catch(err) {
            setState({...state, errors: err.response.data.errors})
        }
        }
        else {
            setState({...state, success: 'Already Logged In', errors:[]})
        }
    }

    return (
        <form className="forgot-form" onSubmit={handleSubmit}>
            <h1 className="form-heading">Reset Your Password</h1>
            <label className="form-label"><i className="fa fa-lock icon"></i>New Password</label>
            <input type="text" id="resetPassword" className="form-input" value={state.password} onChange={handleChange} required/><br/>
            <label className="form-label"><i className="fa fa-lock icon"></i>Confirm New Password</label>
            <input type="text" id="resetPassword2" className="form-input" value={state.password2} onChange={handleChange} required/><br/>
            <label className="form-label"><i className="fa fa-lock icon"></i>Token from Email</label>
            <input type="text" id="token" className="form-input" value={state.token} onChange={handleChange} required/><br/>
            <div className='alert'>
                {state.errors.map (error => <div key={error.msg}>{error.msg}</div>)}
            </div>
            <div className="success"> {state.success}</div>
            <input type="submit" value="Reset Password" className="form-submit"/>
        </form>
    )
}

export default ResetPassword;