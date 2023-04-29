import React from 'react'
import Logo from '../images/logo2.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>Copyright © 2023 All rights reserved. | Created By Team 5 for CS160</span>
      <div>
        <a href="https://www.google.com/"></a>
      </div>
    </footer>
  )
}

export default Footer