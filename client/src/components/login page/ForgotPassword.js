import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext';
import { useHistory } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

const ForgotPassword = () => {
    const [userInfo] = useContext(UserContext);
    const [email, setEmail] = useState({value:"", errors:[], success:""})
    const history = useHistory();
    if (userInfo.isLoggedIn) history.push('/');

    const handleChange = e => setEmail({...email, value: e.target.value})

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userInfo.isLoggedIn === false) {
        const user = {
            email: email.value,
        }
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            const body = JSON.stringify(user);
            const res = await axios.post('/api/users/forgotpassword', body, config);
            setEmail({...email, success: res.data, errors:[]})
        } catch(err) {
            setEmail({...email, errors: err.response.data.errors})
        }
        }
        else {
            setEmail({...email, success: 'Already Logged In', errors:[]})
        }

    }

    return (
        <form className="forgot-form" onSubmit={handleSubmit}>
            <h1 className="form-heading">Darn I Forgot My Password!</h1>
            <label className="form-label"><i className="fa fa-user-o icon"></i>Enter Your Email</label>
            <input type="text" className="form-input" value={email.value} onChange={handleChange} required/><br/>
            <div className='alert'>
                {email.errors.map (error => <div key={error.msg}>{error.msg}</div>)}
            </div>
            <div className="success"> {email.success}</div>
            <input type="submit" value="Send Email" className="form-submit"/>
        </form>
    )
}

export default ForgotPassword
