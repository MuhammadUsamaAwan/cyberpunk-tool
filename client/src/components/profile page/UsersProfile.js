import React, { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import './Profile.css';
import axios from 'axios';

const UsersProfile = ({ match }) => {
    const [profile, setProfile] = useState({
        name: "",
        builds: [],
        date: ""
    })

    useEffect(() => {
        let mounted = true;
        const getProfile = async () => {
            try {
            const res = await axios.get(`/api/users/user/${match.params.id}`);
            if (mounted) {
                setProfile({...profile,
                    name: res.data.user.name,
                    date: res.data.user.date.slice(0, 10),
                    builds: res.data.build
                })
            }
            } catch(err) {
                console.error(err.response.data);
            }
        }
        getProfile();

        return () => {
            mounted = false;
        }
    }, [])

    let length = 0;
    profile.builds.map (build => length = build.upvotes.length + length )

    return (
        <React.Fragment>
            <h1 className="heading">User Profile</h1>
            <div className="card">
                <h1>{profile.name}</h1>
                <p><i className="fa fa-pencil icon"></i>{profile.builds.length} Builds</p>
                <p><i className="fa fa-thumbs-o-up icon"></i>{length} Upvotes</p>
                <p><i className="fa fa-calendar icon"></i>Joined On {profile.date}</p>
            </div>

            <h1 className="heading">{profile.name} Builds</h1>
            <table className="table">
            <thead>
            <tr>
                <th>Title</th>
                <th>Upvotes</th>
                <th>Created On</th>
            </tr>
            </thead>
            
            <tbody>
            { profile.builds.map (build =>
                <tr key={build._id}>
                    <td> <Link to={`/builds/${build._id}`} className="link">{build.title}</Link> </td>
                    <td>{build.upvotes.length}</td>
                    <td>{build.date.slice(0, 10)}</td>
                </tr>
            )}
            </tbody>

        </table>

        </React.Fragment>
    )
}

export default UsersProfile;