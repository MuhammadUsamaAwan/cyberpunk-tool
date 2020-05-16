import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Builds.css';
import './comments.css';
import axios from 'axios';

const BuildDetail = ({ match }) => {
  const [build, setBuild] = useState ({
    "comments": [ { "replies": [{date:""}], date:"" } ]
  });

  useEffect(() => {
    let mounted = true;
    const getBuild = async (id) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/builds/${id}/`);
        if (mounted) {
          setBuild(res.data);
        }
      } catch (err) {
        console.error(err.response.data);
      }
    };

    getBuild(match.params.id);

    return () => {
      mounted = false;
    };
  }, [match.params.id]);

  return (
    <React.Fragment>
      <h1 className='heading'>{build.title}</h1>
      <p className='build-body'>{build.text}</p>
      <div className="comments-container">
        <h1>Comments</h1>
        <div>
            {build.comments.map(comment =>
            <div key={comment._id}>
            <div className="comment">
                <h4 className="comment-author">
                    <Link to={`/profile/${comment.user}`} className="link">
                        {comment.name}
                    </Link>
                </h4>
                <div>
                    <p className="comment-text">
                        {comment.text}
                    </p>
                    <div className="comment-date">
                        {comment.date.slice(0, 10)} {comment.date.slice(12, 16)}
                        <i className="fa fa-reply icon reply-icon"></i>
                    </div>
                </div>
            </div>
            <ul>{comment.replies.map (reply =>
                <li key={reply._id} className="comment">
                    <h4 className="comment-author">
                        <Link to={`/profile/${reply.user}`} className="link">
                            {reply.name}
                        </Link>
                    </h4>
                    <div>
                        <p className="comment-text">
                            {reply.text}
                        </p>
                        <div className="comment-date">
                            {reply.date.slice(0, 10)} {comment.date.slice(12, 16)}
                    </div>
                </div>
                </li>)}
            </ul>
            </div>
            )}
        </div>
        </div>
    </React.Fragment>
  );
};

export default BuildDetail;
