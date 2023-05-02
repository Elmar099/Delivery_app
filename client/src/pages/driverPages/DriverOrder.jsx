import React, { useContext } from "react"
import { useEffect} from 'react'
import { useState } from 'react'
// import {Link} from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from "../../context/authContext"
import { useNavigate } from 'react-router-dom'

const DriverOrder = () => {
  const { currentUser } = useContext(AuthContext);
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

const navigate = useNavigate()

function handleClick(index) {
  const postId = posts[index].id
  const newDid = currentUser.id;
  const requestOptions = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({postId,  did: newDid })
  };
  fetch(`/driverPosts/${postId}`, requestOptions)
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        setPosts(prevState => {
          const newState = [...prevState];
          newState[index].did = newDid;
          return newState;
        });
      }
      navigate('/driver')
    })
    .catch(error => console.error(error));
}

  return (
    <div className='home'>
      <div className="posts">
          <h1>~Available Orders~</h1>
      {currentUser ?
      posts.map((post, index)=>(
        <div className="post" key={post.id}>
          <div className='img'>
            <img src="https://img.freepik.com/premium-vector/good-food-logo-design_79169-10.jpg?w=2000" alt="" />
          </div>
          <div className="content">
            <h2 className="title">{post.title}</h2>
            <p>{post.details}</p>
            <b>Restaurant Location</b>
            <p>{JSON.parse(post.address)["address address-search"]}</p>
            <p>{JSON.parse(post.address).apartment}</p>
            <p>{JSON.parse(post.address).city},{JSON.parse(post.locate).state},{JSON.parse(post.locate).country}</p>
            <p>{JSON.parse(post.address).postcode}</p>
            <b>Customer Address</b>
            <p>{JSON.parse(post.locate)["address address-search"]}</p>
            <p>{JSON.parse(post.locate).apartment}</p>
            <p>{JSON.parse(post.locate).city},{JSON.parse(post.locate).state},{JSON.parse(post.locate).country}</p>
            <p>{JSON.parse(post.locate).postcode}</p>

            <button onClick={() => handleClick(index)}>
              Accept Delivery
            </button>
          </div>
        </div>
        ))
        : <p className="noOrders"><br>Need to login.</br></p>
      }
      </div>
    </div>
  )
}

export default DriverOrder