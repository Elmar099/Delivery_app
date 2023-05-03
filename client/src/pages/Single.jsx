import React, { useContext, useEffect, useState } from 'react'
import {Link, useLocation, useNavigate} from 'react-router-dom'
import Edit from '../images/edit.png'
import Delete from '../images/delete.png'
import axios from 'axios'
import { AuthContext } from '../context/authContext'

const Single = () => {
  const [post, setPost] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const postId = location.pathname.split("/")[2];

  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async ()=>{
    try {
      await axios.delete(`/posts/${postId}`);
      navigate("/order")
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className='single'>
      <div className="content">
        <div className='user'>
          {post.userImg
            && <img src={post.userImg} alt="" />
          }
          
          <div className="info">
            <h2>{post.username}</h2>
          </div>
        {currentUser.username === post.username &&  (
        <div className="edit">
          <Link to={`/write?edit=2`} state={post}>
            <img src={Edit} alt="edit" />
          </Link>
          <img onClick={handleDelete} src={Delete} alt="delete" />
        </div>
        )}
        </div>
        <h1>{post.title}</h1>
        
        {post.details}
      </div>
      
    </div>
  )
}

export default Single