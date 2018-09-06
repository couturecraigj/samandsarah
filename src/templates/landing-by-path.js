import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.wordpressPage
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div id="main">
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <hr />
        </div>
      </div>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query LandingByPath($slug: String) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPage(slug: { eq: $slug }) {
      id
      content
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
