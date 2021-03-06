import React, { useContext, useState } from 'react';
import './Login.css';
import { UserContext } from '../../UserContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const [userData, setUserData] = useState({ name:'', email:'', password:'', password2:'', loginEmail:'', loginPassword:'', errorsLogin: [], errorsSignup: [], loginSuccess:'', signupSuccess:''})

    const history = useHistory();
    if (userInfo.isLoggedIn) history.push('/');
    return (
        <React.Fragment>
        <div className="container">
            <LoginForm userData={userData} setUserData={setUserData} userInfo={userInfo} setUserInfo={setUserInfo}/>
            <SignupForm userData={userData} setUserData={setUserData} userInfo={userInfo} setUserInfo={setUserInfo}/>
        </div>
        </React.Fragment>
    )
}

export default Login
