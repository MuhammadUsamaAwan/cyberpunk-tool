import React, { useContext, useEffect, useState } from 'react';
import './Profile.css';
import { UserContext } from '../../UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const [userInfo] = useContext(UserContext);
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
                    name: res.data.name,
                    email: res.data.email,
                    date: res.data.date.slice(0, 10),
                })
                console.log(profile)
            }
            } catch(err) {
                console.error(err.response.data);
            }
        }
        getProfile();

        // const getBuilds = async () => {
        //     try {
        //     const res = await axios.get ('api/builds');
        //     if (mounted) {
        //         setProfile ({...profile, builds: res.data.filter (build => build.name === profile.name)});
        //     }
        //     } catch(err) {
        //         console.error(err.response.data)
        //     }
        // }
        // getBuilds();

        return () => {
            mounted = false;
        }
    }, [])

    return (
        <React.Fragment>
        <h1 className="heading">My Profile</h1>
        <div className="card">
        <h1>{profile.name}</h1>
        <p><i className="fa fa-user-o icon"></i>{profile.email}</p>
        <p><i className="fa fa-pencil icon"></i>{profile.builds.length} Builds</p>
        <p><i className="fa fa-thumbs-o-up icon"></i>23 Upvotes</p>
        <p><i className="fa fa-calendar icon"></i>Joined On {profile.date}</p>
        <button>Change Password?</button>
        <button>Logout</button>
        <div>
        </div>
        </div>
        </React.Fragment>
    )
}

export default Profile;