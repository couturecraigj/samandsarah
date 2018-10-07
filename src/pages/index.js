import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'
import BlogList from '../components/BlogList'

// import Lightbox from 'react-images'
// import Gallery from '../components/Gallery'
import GetInTouch from '../components/GetInTouch'

class HomeIndex extends React.Component {
  constructor() {
    super()

    this.state = {
      lightboxIsOpen: false,
      currentImage: 0,
    }

    this.closeLightbox = this.closeLightbox.bind(this)
    this.gotoNext = this.gotoNext.bind(this)
    this.gotoPrevious = this.gotoPrevious.bind(this)
    this.openLightbox = this.openLightbox.bind(this)
    this.handleClickImage = this.handleClickImage.bind(this)
  }

  openLightbox(index, event) {
    event.preventDefault()
    this.setState({
      currentImage: index,
      lightboxIsOpen: true,
    })
  }
  closeLightbox() {
    this.setState({
      currentImage: 0,
      lightboxIsOpen: false,
    })
  }
  gotoPrevious() {
    this.setState({
      currentImage: this.state.currentImage - 1,
    })
  }
  gotoNext() {
    this.setState({
      currentImage: this.state.currentImage + 1,
    })
  }
  handleClickImage() {
    if (this.state.currentImage === this.props.images.length - 1) return

    this.gotoNext()
  }

  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const {
      edges: postEdges,
      totalCount: postCount,
    } = this.props.data.allWordpressPost

    const { edges: pageEdges } = this.props.data.allWordpressPage
    const siteDescription = this.props.data.site.siteMetadata.description

    return (
      <div>
        <Helmet>
          <title>Home</title>
        </Helmet>

        <div id="main">
          {pageEdges.map(({ node }) => {
            return (
              <section id="one" key={node.slug}>
                <header className="major">
                  <h2 dangerouslySetInnerHTML={{ __html: node.title }} />
                </header>
                <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                <ul className="actions">
                  <li>
                    <Link
                      to={node.slug + '#wordpress-page-title'}
                      className="button"
                    >
                      Learn More
                    </Link>
                  </li>
                </ul>
              </section>
            )
          })}
          <section id="two">
            <header className="major">
              <h2>Recent Posts</h2>
            </header>
            <BlogList
              edges={postEdges}
              closingComponent={() =>
                postCount > 3 ? (
                  <Link to="/blog" className="button">
                    Read More
                  </Link>
                ) : null
              }
            />
          </section>
          <GetInTouch />
        </div>
      </div>
    )
  }
}

export default HomeIndex

export const pageQuery = graphql`
  query PageQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allWordpressPage {
      edges {
        node {
          content
          path: date(formatString: "/YYYY/MM/DD/")
          slug
          title
          excerpt
          featured_media {
            localFile {
              childImageSharp {
                sizes(
                  traceSVG: {
                    color: "#edcaa0"
                    background: "#a87f5c"
                    turnPolicy: TURNPOLICY_MINORITY
                    blackOnWhite: false
                  }
                  cropFocus: ATTENTION
                  maxWidth: 300
                  toFormat: PNG
                ) {
                  ...GatsbyImageSharpSizes_withWebp_tracedSVG
                }
              }
            }
          }
        }
      }
    }
    allWordpressPost(limit: 3) {
      totalCount
      edges {
        node {
          content
          path: date(formatString: "/YYYY/MM/DD/")
          slug
          title
          excerpt
          featured_media {
            localFile {
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
    }
  }
`
