import React, { useContext } from "react"
import { useEffect} from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../context/authContext"


const Home = () => {
  const [posts, setPosts] = useState([])
  const { currentUser } = useContext(AuthContext);

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

  const [isDriverRequested, setIsDriverRequested] = useState(false);

  const handleClick = () => {
    setIsDriverRequested(true);
  };

  

  return (
    <div className='home'>
      <div className='posts'>
        <h1>~Orders~</h1>
      {currentUser ?
      posts.map((post) => (
        <div className='post' key={post.id}>
          <div className='img'>
            <img src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000" alt="" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
            <p>{post.desc}</p>
           
              <button onClick={handleClick}>Request Driver</button>
             { isDriverRequested && <div className="requested">Driver has been requested!</div>}
          </div>
        </div>
      ))
      : <p className="noOrders"><br></br>Need to login.</p>
    } 
      </div>
    </div>
  )
}

export default Home