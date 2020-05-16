import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import './Builds.css';
import './comments.css';
import axios from 'axios';

const BuildDetail = ({ match }) => {
  const [build, setBuild] = useState ({
    "comments": [ { "replies": [{date:""}], date:"" } ]
  });
  const [comment, setComment] = useState("");
  const [userInfo] = useContext(UserContext);
  const [updateComment, setUpdateComment] = useState(false);
  useEffect(() => {
    let mounted = true;
    const getBuild = async (id) => {
      try {
        const res = await axios.get(`http://localhost:3000/api/builds/${id}/`);
        if (mounted) {
          setBuild(res.data);
        }
        console.log('ok')
      } catch (err) {
        console.error(err.response.data);
      }
    };

    getBuild(match.params.id);

    return () => {
      mounted = false;
    };
  }, [match.params.id, updateComment]);

  const handleChange = e => setComment(e.target.value);
  
  const handleSubmit = async e => {
    e.preventDefault();
    if (userInfo.isLoggedIn === true) {
      const body = {
        "text": comment
      }
      try {
        const config = {
          headers: {
            'x-auth-token': userInfo.token
          }
        }
        await axios.post(`/api/builds/comment/${build._id}`, body, config);
        setComment("");
        setUpdateComment(!updateComment);
      } catch(err) {
        console.error(err.response.data);
      }
    }
  }

  const deleteComment = async id => {
    try {
      const config = {
        headers: {
          'x-auth-token': userInfo.token
        }
      }
      await axios.delete(`/api/builds/comment/${build._id}/${id}`, config);
      setUpdateComment(!updateComment);
    } catch(err) {
      console.error(err.response.data);
    }
  }

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
                        <i className="fa fa-trash icon reply-icon"
                        onClick={() => deleteComment(comment._id)}></i>
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
          <form className="new-comment-container" onSubmit={handleSubmit}>
            <textarea type="text" placeholder="Leave a comment..." className="new-comment" value={comment} onChange={handleChange}/>
            <input type="submit" value="Submit Comment" className="comment-submit"/>
          </form>
        </div>
    </React.Fragment>
  );
};

export default BuildDetail;
