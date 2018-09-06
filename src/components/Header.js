import React from 'react'

import Footer from './Footer'
import avatar from '../assets/images/avatar.jpg'

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="inner">
          <a href="/" className="image avatar">
            <img src={avatar} alt="" />
          </a>
          <h1>
            <strong>Wullbrandt Croatia Ministry</strong>
          </h1>
          <a href="/about">About</a>
          <br />
          <a href="/croatia">Croatia</a>
        </div>
        <Footer />
      </header>
    )
  }
}

export default Header
