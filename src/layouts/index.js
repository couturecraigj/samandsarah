import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import '../assets/scss/main.scss'

import Header from '../components/Header'

class Template extends React.Component {
  render() {
    const { children, data } = this.props

    return (
      <div>
        <div id="fb-root" />
        <Helmet titleTemplate={`%s - ${data.site.siteMetadata.title}`}>
          <meta
            name="description"
            content={data.site.siteMetadata.description}
          />
        </Helmet>
        <Header />
        {children()}
      </div>
    )
  }
}

Template.propTypes = {
  children: PropTypes.func,
}

export default Template

export const layoutQuery = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
