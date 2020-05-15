import React, { useEffect, useContext } from 'react';
import { BuildsContext } from './BuildsContext';
import './Builds.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

const GetBuilds = ({ sort }) => {
    const [builds, setBuilds] = useContext(BuildsContext);
    
    useEffect(() => {
        let mounted = true;
        const getBuilds = async () => {
            try {
            const res = await axios.get ('api/builds');
            if (mounted) {
                const data = (res.data.filter (build => build.private !==true));
                if (sort==='upvotes')
                setBuilds(data.sort((a, b) => (a.upvotes > b.upvotes) ? -1 : 1));
                if (sort==='dateA')
                setBuilds(data.sort((a, b) => (a.date > b.date) ? 1 : -1));
                if (sort==='dateD')
                setBuilds(data.sort((a, b) => (a.date > b.date) ? -1 : 1));
            }
            } catch(err) {
                console.error(err.response.data)
            }
        }

        getBuilds();

        return () => {
            mounted = false;
        }
    }, [setBuilds, sort])

    return (
        <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Upvotes</th>
                <th>Author</th>
                <th>Created On</th>
            </tr>
            </thead>
            
            <tbody>
            { builds.map (build =>
                <tr key={build._id}>
                    <td> <Link to={`/builds/${build._id}`} className="link">{build.title}</Link> </td>
                    <td>{build.upvotes.length}</td>
                    <td><Link to={`/profile/${build.user}`} className="link">{build.name}</Link></td>
                    <td>{build.date.slice(0, 10)}</td>
                </tr>
            )}
            </tbody>

        </table>
    )
}

export default GetBuilds;
