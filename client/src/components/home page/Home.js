import React from 'react';
import './Home.css';

const Home = () => {
    return (
        <React.Fragment>
            <h1 className="heading">Cyberpunk Tool</h1>
            <div className="text">
            CyberpunkTool is a site dedicated to providing build planners for the Cyberpunk 2077 video game.

            Some of the things you can do with CyberpunkTool:
            
            <ul>
            <li>Craft a perfectly min-maxed character for Cyberpunk 2077</li>
            <li>Save your builds and share them with others</li>
            <li>Browse other people's submitted builds</li>
            <li>Upvote other builds to add to your favorites</li>
            <li>Find out your AR, Defense rating and other active effects</li>
            ...and more!
            </ul>
            </div>
        </React.Fragment>
    )
}

export default Home;
