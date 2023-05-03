import React, { useContext } from "react"
import { useEffect} from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../context/authContext"
// import { useNavigate } from 'react-router-dom'


const Order = () => {
  
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get("/posts")
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData()
  }, []);

  function handleClick(index) {
    const postId = posts[index].id;
    const newRequested = 1;
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ postId, requested: newRequested })
    };
    fetch(`/posts/update/${postId}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setPosts(prevState => {
            const newState = [...prevState];
            newState[index].requested = newRequested;
            return newState;
          });
        }
        navigate('/order')
      })
      .catch(error => console.error(error));
  }
  
  

  return (
    <div className='home'>
      <div className='posts'>
        <h1>~Orders~</h1>
      {currentUser ?
      posts.map((post, index) => (
        <div className='post' key={post.id}>
          <div className='img'>
            <img src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000" alt="" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
            <p>{post.details}</p>
            <p>{post.address}</p>

              {post.requested === 1 ?
                  <div className="requested">requested!</div> : 
               <button onClick={() => handleClick(index)}>Request driver</button>
              }
            
             {/* {post.requested && <div className="requested">Driver has been requested!</div>} */}
          </div>
        </div>
      ))
      : <p className="noOrders"><br></br>Need to login.</p>
    } 
      </div>
    </div>
  )
}


export default Order