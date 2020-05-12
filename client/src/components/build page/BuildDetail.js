import React, { useState,useEffect } from 'react';
import './Builds.css';
import axios from 'axios';

const BuildDetail = ({ match }) => {
    const [build, setBuild] = useState([]);
    useEffect(() => {
        let mounted = true;
        const getBuild = async id => {
            try {
            const res = await axios.get (`http://localhost:3000/api/builds/${id}/`);
            if (mounted) {
                setBuild (res.data);
            }
            } catch(err) {
                console.error(err.response.data);
            }
        }

        getBuild(match.params.id);

        return () => {
            mounted = false;
        }
    }, [match.params.id])

    return (
        <React.Fragment>
            <h1 className="heading">{build.title}</h1>
            <p className="build-body">{build.text}</p>
        </React.Fragment>
    )
}

export default BuildDetail;
