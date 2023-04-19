import React from "react"
import { useEffect} from 'react'
import { useState } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Home = () => {
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

  return (
    <div className='home'>
      <div className='posts'>
        <h1>~Orders~</h1>
      {
      posts.map((post) => (
        <div className='post' key={post.id}>
          <div className='img'>
            <img src="https://image.similarpng.com/very-thumbnail/2021/09/Good-food-logo-design-on-transparent-background-PNG.png" alt="" />
          </div>
          <div className="content">
            <Link className='link' to={`/post/${post.id}`}>
              <h2 className="title">{post.title}</h2>
            </Link>
            <p>{post.desc}</p>
            <button>Request Driver</button>
          </div>
        </div>
      ))
    } 
      </div>
    </div>
  )
}

export default Home