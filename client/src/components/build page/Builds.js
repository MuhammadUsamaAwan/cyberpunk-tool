import React, { useState,useEffect } from 'react';
import './Builds.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Builds = () => {
    const [builds, setBuilds] = useState([]);
    
    useEffect(() => {
        let mounted = true;
        const getBuilds = async () => {
            try {
            const res = await axios.get ('api/builds');
            if (mounted) {
                const data = (res.data.filter (build => build.private !==true));
                setBuilds(data);
            }
            } catch(err) {
                console.error(err.response.data)
            }
        }

        getBuilds();

        return () => {
            mounted = false;
        }
    }, [])

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
                    <td> <Link to={`/builds/${build._id}`} className="link">{build.title}</Link> </td>
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
