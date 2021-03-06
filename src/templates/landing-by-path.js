import React from 'react'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import has from 'lodash/has'
import GetInTouch from '../components/GetInTouch'
import { sanitizeText } from '../utils/wordpress-tools'
import { openGraphMeta } from '../utils/opengraph-tools'
import Comments from '../components/Comments'
import LikeButton from '../components/LikeButton'
class BlogPostTemplate extends React.Component {
  render() {
    const { props } = this
    const page = props.data.wordpressPage
    const siteTitle = get(props, 'data.site.siteMetadata.title')

    return (
      <div>
        <div id="main">
          <h1
            id="wordpress-page-title"
            dangerouslySetInnerHTML={{ __html: page.title }}
          />
          <p>{page.date}</p>
          {has(props, 'data.wordpressPage.featured_media.localFile') && (
            <Img
              sizes={get(
                props,
                'data.wordpressPage.featured_media.localFile.childImageSharp.sizes'
              )}
            />
          )}
          <Helmet
            title={sanitizeText(page.title)}
            meta={[
              openGraphMeta(
                'title',
                `${sanitizeText(page.title)} - ${siteTitle}`
              ),
              openGraphMeta(
                'image',
                get(page, 'featured_media.localFile.publicURL')
              ),
            ]}
          />
          <div dangerouslySetInnerHTML={{ __html: page.content }} />
          <LikeButton />
          {page.comment_status === 'open' && <Comments />}
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
      comment_status
      date(formatString: "MMMM DD, YYYY")
      featured_media {
        localFile {
          publicURL
          childImageSharp {
            sizes(
              cropFocus: ENTROPY
              maxWidth: 1000
              quality: 100
              traceSVG: {
                color: "#edcaa0"
                background: "#a87f5c"
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
