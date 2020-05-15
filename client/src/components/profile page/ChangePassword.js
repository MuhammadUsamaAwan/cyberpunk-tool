import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useHistory } from 'react-router-dom';
import '../login page/Login.css'
import axios from 'axios';

const ChangePassword = () => {
    const [userInfo] = useContext(UserContext);
    const [state, setState] = useState({password:"", password2:"", oldpassword:"", errors:[], success:""})
    const history = useHistory();
    if (!userInfo.isLoggedIn) history.push('/');

    const handleChange = e => {
        if(e.target.id === "changePassword")
        setState({...state, password: e.target.value})
        if(e.target.id === "changePassword2")
        setState({...state, password2: e.target.value})
        if(e.target.id === "oldPassword")
        setState({...state, oldpassword: e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.password !== state.password2) setState({...state, errors: [{msg: 'New Passwords do not match'}]})
        else if (userInfo.isLoggedIn === true) {
        const user = {
            "password": state.oldpassword,
            "newPassword": state.password,
        }
        try {
            const config = {
                headers: {
                    'x-auth-token': userInfo.token
                }
            }
            //const body = JSON.stringify(user);
            const res = await axios.post('/api/users/changepassword', user, config);
            setState({...state, success: res.data, errors:[]});
            history.push('/');
        } catch(err) {
            setState({...state, errors: err.response.data.errors, success: ""})
        }
        }
        else {
            setState({...state, success: 'Please Log In First', errors:[]})
        }
    }

    return (
        <form className="forgot-form" onSubmit={handleSubmit}>
            <h1 className="form-heading">Change Your Password</h1>
            <label className="form-label"><i className="fa fa-lock icon"></i>Current Password</label>
            <input type="password" id="oldPassword" className="form-input" value={state.oldpassword} onChange={handleChange} required/><br/>
            <label className="form-label"><i className="fa fa-lock icon"></i>New Password</label>
            <input type="password" id="changePassword" className="form-input" value={state.password} onChange={handleChange} required/><br/>
            <label className="form-label"><i className="fa fa-lock icon"></i>Confirm New Password</label>
            <input type="password" id="changePassword2" className="form-input" value={state.password2} onChange={handleChange} required/><br/>
            <div className='alert'>
                {state.errors.map (error => <div key={error.msg}>{error.msg}</div>)}
            </div>
            <div className="success"> {state.success}</div>
            <input type="submit" value="Change Password" className="form-submit"/>
        </form>
    )
}

export default ChangePassword;