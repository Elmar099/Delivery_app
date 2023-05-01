import React, { useContext } from "react"
import { useEffect} from 'react'
import { useState } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
// import { AuthContext } from "../../context/authContext"

const DriverOrder = () => {
  // const { currentUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await axios.get("/driverPosts")
        setPosts(res.data)
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, []);

  // const [isDriverRequested, setIsDriverRequested] = useState(false);

  // const handleClick = () => {
  //   setIsDriverRequested(true);
  // };

  const handleClick = async e => {
    // e.preventDefault()
    // try{
    //   await axios.put('/posts/', inputs)
    //   navigate('/home')
    // }catch(err) {
    //   setError(err.response.data)
    // }
  }

  return (
    <div className='home'>
      <div className="posts">
        {posts.map(post=>(
          <div className="post" key={post.id}>
            <div className='img'>
              <img src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000" alt="" />
            </div>
            <div className="content">
              <h2 className="title">{post.title}</h2>
              <p>{post.desc}</p>
              <p>Restaurant Location</p>
              <p>{post.address}</p>
              <p>Customer Address</p>
              <p>{post.locate}</p>
              <button onClick={handleClick}>Accept Delivery</button>
            </div>
          </div>
        ))}
      </div>
    </div>
    // <div className='home'>
    //   <div className='posts'>
    //     <h1>~Available Orders~</h1>
    //     {posts.map(post=>(
          
    //     ))}
    //     <div className='post' key={post.id}>
          // <div className='img'>
          //   <img src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000" alt="" />
          // </div>
    //       <div className="content">
    //         <Link className='link' to={`/post/${post.id}`}>
    //           <h2 className="title">{post.title}</h2>
    //         </Link>
    //         <p>{post.desc}</p>
    //         <p>{post.locate}</p>
           
    //           <button onClick={handleClick}>Request Driver</button>
    //          { isDriverRequested && <div className="requested">Driver has been requested!</div>}
    //       </div>
    //     </div>
  
    //   : <p className="noOrders"><br></br>Need to login.</p>
  
    //   </div>
    // </div>
  )
}

export default DriverOrder