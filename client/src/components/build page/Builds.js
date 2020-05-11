import React, { useState } from 'react';
import './Builds.css';
import axios from 'axios';

const getBuilds = async () => {
    const res = await axios.get ('api/builds');
    return res.data;
}

const Builds = () => {
    const [builds, setBuilds] = useState([]);
    getBuilds().then(res => {
        const data = (res.filter (build => build.private !==true));
        setBuilds(data);
    });
    return (
        <React.Fragment>
        <h1 className="heading">Builds</h1>
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Upvotes</th>
                <th>Auther</th>
                <th>Created On</th>
            </tr>
            </thead>
            
            <tbody>
            { builds.map (build =>
                <tr key={build._id}> 
                    <td>{build.title}</td>
                    <td>{build.upvotes.length}</td>
                    <td>{build.name}</td>
                    <td>{build.date.slice(0, 10)}</td>
                </tr>
            )}
            </tbody>

        </table>
        </React.Fragment>
    )
}

export default Builds;
