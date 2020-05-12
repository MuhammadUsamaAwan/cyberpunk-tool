import React, {useState, createContext} from 'react';

export const BuildsContext= createContext();

export const BuildsProvider = props => {
    const [builds, setBuilds] = useState([]);
    return(
        <BuildsContext.Provider value={[builds, setBuilds]} >
            {props.children}
        </BuildsContext.Provider>
    )
}