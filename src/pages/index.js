import React from 'react'
import Link from 'gatsby-link'
import Img from 'gatsby-image'
import get from 'lodash/get'
import Helmet from 'react-helmet'

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
    const posts = this.props.data.allWordpressPost.edges.map(({ node }) => node)
    const siteDescription = this.props.data.site.siteMetadata.description

    return (
      <div>
        <Helmet>
          <title>{siteTitle}</title>
          <meta name="description" content={siteDescription} />
        </Helmet>

        <div id="main">
          <section id="one">
            <header className="major">
              <h2>
                Ipsum lorem dolor aliquam ante commodo
                <br />
                magna sed accumsan arcu neque.
              </h2>
            </header>
            <p>
              Accumsan orci faucibus id eu lorem semper. Eu ac iaculis ac nunc
              nisi lorem vulputate lorem neque cubilia ac in adipiscing in curae
              lobortis tortor primis integer massa adipiscing id nisi accumsan
              pellentesque commodo blandit enim arcu non at amet id arcu magna.
              Accumsan orci faucibus id eu lorem semper nunc nisi lorem
              vulputate lorem neque cubilia.
            </p>
            <ul className="actions">
              <li>
                <a href="#" className="button">
                  Learn More
                </a>
              </li>
            </ul>
          </section>

          <section id="two">
            <h2>Recent Posts</h2>

            <ul className="actions">
              {posts.map(post => {
                return (
                  <li>
                    <Link to={post.path + post.slug}>
                      <h3 dangerouslySetInnerHTML={{ __html: post.title }} />
                      <Img
                        sizes={
                          post.featured_media.localFile.childImageSharp.sizes
                        }
                      />
                      <div dangerouslySetInnerHTML={{ __html: post.excerpt }} />
                    </Link>
                  </li>
                )
              })}
              <li>
                <Link to="/blog" className="button">
                  Read More
                </Link>
              </li>
            </ul>
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
    allWordpressPost {
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
                    color: "#8d82c4"
                    background: "#252a43"
                    turnPolicy: TURNPOLICY_MINORITY
                    blackOnWhite: false
                  }
                  cropFocus: ATTENTION
                  maxWidth: 1000
                  toFormat: PNG
                ) {
                  ...GatsbyImageSharpSizes_tracedSVG
                }
              }
            }
          }
        }
      }
    }
  }
`
