import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import GetInTouch from '../components/GetInTouch'
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
          <Img
            sizes={get(post, 'featured_media.localFile.childImageSharp.sizes')}
          />
          <br />
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <GetInTouch />
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
      featured_media {
        localFile {
          childImageSharp {
            sizes(
              traceSVG: {
                color: "#F7E8D7"
                background: "#6A635C"
                turnPolicy: TURNPOLICY_MINORITY
                blackOnWhite: false
              }
              cropFocus: ATTENTION
              maxWidth: 1000
              toFormat: PNG
            ) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
