import React, {useState, createContext, useEffect} from 'react';

export const UserContext= createContext();

export const UserProvider = props => {
    
    const [userInfo, setUserInfo] = useState( () => {
        return localStorage.getItem('userInfo') ?
            JSON.parse(localStorage.getItem('userInfo')) : {
            isLoggedIn: false,
            token: ""
        }
    });
    
    useEffect(()=>{
        localStorage.setItem('userInfo', JSON.stringify(userInfo))
    }, [userInfo]);

    return(
        <UserContext.Provider value={[userInfo, setUserInfo]} >
            {props.children}
        </UserContext.Provider>
    )
}