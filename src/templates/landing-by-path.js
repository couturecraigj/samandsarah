import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import has from 'lodash/has'
import GetInTouch from '../components/GetInTouch'
class BlogPostTemplate extends React.Component {
  render() {
    const { props } = this
    const post = props.data.wordpressPage
    const siteTitle = get(props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div id="main">
          <h1>{post.title}</h1>
          <p>{post.date}</p>
          {has(props, 'data.wordpressPage.featured_media.localFile') && (
            <Img
              sizes={get(
                props,
                'data.wordpressPage.featured_media.localFile.childImageSharp.sizes'
              )}
            />
          )}
          <Helmet title={`${post.title} | ${siteTitle}`} />

          <div dangerouslySetInnerHTML={{ __html: post.content }} />
          <GetInTouch />
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
      featured_media {
        localFile {
          childImageSharp {
            sizes(
              cropFocus: ENTROPY
              maxWidth: 1500
              quality: 100
              traceSVG: {
                color: "#F7E8D7"
                background: "#333856"
                turnPolicy: TURNPOLICY_MINORITY
                blackOnWhite: false
              }
            ) {
              ...GatsbyImageSharpSizes_withWebp_tracedSVG
            }
          }
        }
      }
    }
  }
`
