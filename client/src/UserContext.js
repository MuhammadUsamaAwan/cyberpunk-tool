import React, {useState, createContext} from 'react';

export const UserContext= createContext();

export const UserProvider = props => {
    const [userInfo, setUserInfo] = useState(
        {
            isLoggedIn: false,
            token: ""
        }
        )

    return(
        <UserContext.Provider value={[userInfo, setUserInfo]} >
            {props.children}
        </UserContext.Provider>
    )
}