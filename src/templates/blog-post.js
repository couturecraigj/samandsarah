import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import get from 'lodash/get'

class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.wordpressPost
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div id="main">
          <Helmet title={`${post.title} | ${siteTitle}`} />
          <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
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
  query BlogPostByPath($slug: String!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    wordpressPost(slug: { eq: $slug }) {
      id
      content
      title
      date(formatString: "MMMM DD, YYYY")
    }
  }
`
