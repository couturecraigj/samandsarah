import React from 'react'
import Link from 'gatsby-link'
import Footer from './Footer'
import avatar from '../assets/images/avatar.jpg'

class Header extends React.Component {
  render() {
    return (
      <header id="header">
        <div className="inner">
          <Link to="/" className="image avatar">
            <img src={avatar} alt="" />
          </Link>
          <h1>
            <strong>Wullbrandt Croatia Ministry</strong>
          </h1>
          <p>
            <strong>
              Training leaders, Planting & Strengthening <br /> Churches in
              Croatia
            </strong>
          </p>
          <Link to="/about">About</Link>
        </div>
        <Footer />
      </header>
    )
  }
}

export default Header
