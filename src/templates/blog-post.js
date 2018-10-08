import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import GetInTouch from '../components/GetInTouch'
import { sanitizeText } from '../utils/wordpress-tools'
import { openGraphMeta } from '../utils/opengraph-tools'
import Comments from '../components/Comments'
class BlogPostTemplate extends React.Component {
  render() {
    const post = this.props.data.wordpressPost
    const commentStatus = post.comment_status
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div id="main">
          <Helmet
            title={sanitizeText(post.title)}
            meta={[
              openGraphMeta(
                'title',
                `${sanitizeText(post.title)} - ${siteTitle}`
              ),
              openGraphMeta(
                'image',
                get(post, 'featured_media.localFile.publicURL')
              ),
            ]}
          />
          <h1
            id="wordpress-head"
            dangerouslySetInnerHTML={{ __html: post.title }}
          />
          <p>{post.date}</p>
          <Img
            sizes={get(post, 'featured_media.localFile.childImageSharp.sizes')}
          />
          <br />
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          {commentStatus === 'open' && <Comments />}

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
      comment_status
      featured_media {
        link
        localFile {
          publicURL
          childImageSharp {
            sizes(
              traceSVG: {
                color: "#edcaa0"
                background: "#a87f5c"
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
