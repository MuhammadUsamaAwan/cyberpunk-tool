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
  const [reply, setReply] = useState({ value:"", active: false});
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
  }, [match.params.id, updateComment]);

  const handleChange = e => {
    if (e.target.id === "comment")
    setComment(e.target.value);
    if (e.target.id === "reply")
    setReply({...reply, value: e.target.value});
  }

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
  
  const handleReply = async e => {
    e.preventDefault();
    if (userInfo.isLoggedIn === true) {
      const body = {
        "text": reply.value
      }
      try {
        const config = {
          headers: {
            'x-auth-token': userInfo.token
          }
        }
        await axios.post(`/api/builds/comment/${build._id}/${e.target.id}/reply`, body, config);
        setReply({...reply, value: ""});
        setUpdateComment(!updateComment);
      } catch(err) {
        console.error(err.response.data);
      }
    }
  }

  const deleteReply = async (commentID, replyID) => {
    try {
      const config = {
        headers: {
          'x-auth-token': userInfo.token
        }
      }
      await axios.delete(`/api/builds/comment/${build._id}/${commentID}/reply/${replyID}`, config);
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
                        <i className="fa fa-reply icon reply-icon"
                        onClick={()=> setReply({...reply, active: !reply.active})}
                        ></i>
                        <i className="fa fa-trash icon reply-icon"
                        onClick={() => deleteComment(comment._id)}></i>
                    </div>
                    <form onSubmit={handleReply} id={comment._id} className={reply.active ? null : "hide-reply"}>
                      <textarea id="reply" type="text" placeholder="Leave a reply..." value={reply.value} onChange={handleChange}/>
                      <input type="submit" value="Reply"/>
                    </form>
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
                            <i className="fa fa-trash icon reply-icon"
                            onClick={() => deleteReply(comment._id, reply._id)}></i>
                        </div>
                </div>
                </li>)}
            </ul>
            </div>
            )}
        </div>
          <form className="new-comment-container" onSubmit={handleSubmit}>
            <textarea type="text" id="comment" placeholder="Leave a comment..." className="new-comment" value={comment} onChange={handleChange}/>
            <input type="submit" value="Submit Comment" className="comment-submit"/>
          </form>
        </div>
    </React.Fragment>
  );
};

export default BuildDetail;
