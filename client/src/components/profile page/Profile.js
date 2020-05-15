import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { UserContext } from '../../UserContext';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [userInfo, setUserInfo] = useContext(UserContext);
    const history = useHistory();
    if (!userInfo.isLoggedIn) history.push('/');
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        builds: [],
        date: ""
    })

    useEffect(() => {
        let mounted = true;
        const getProfile = async () => {
            try {
            const config = {
                headers: {
                    'x-auth-token': userInfo.token
                }
            }
            const res = await axios.get('/api/users/me', config);
            if (mounted) {
                setProfile({...profile,
                    name: res.data.user.name,
                    email: res.data.user.email,
                    date: res.data.user.date.slice(0, 10),
                    builds: res.data.build
                })
                console.log(res.data)
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

    const logout = () => {
        setUserInfo({isLoggedIn: false, token: ""})
        history.push('/');
    }

    return (
        <React.Fragment>
            <h1 className="heading">My Profile</h1>
            <div className="card">
                <h1>{profile.name}</h1>
                <p><i className="fa fa-user-o icon"></i>{profile.email}</p>
                <p><i className="fa fa-pencil icon"></i>{profile.builds.length} Builds</p>
                <p><i className="fa fa-thumbs-o-up icon"></i>{length} Upvotes</p>
                <p><i className="fa fa-calendar icon"></i>Joined On {profile.date}</p>
                <button className="btn">Change Password?</button>
                <button className="btn" onClick={logout}>Logout</button>
            </div>

            <h1 className="heading">My Builds</h1>
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

export default Profile;