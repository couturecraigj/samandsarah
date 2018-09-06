const _ = require('lodash')
const Promise = require('bluebird')
const path = require('path')
const createPaginatedPages = require('gatsby-paginate')
const fs = require(`fs-extra`)

const devMode = process.env.NODE_ENV !== 'production'

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators
  // pexels-photo-132340
  query = `
      {
        defaultSharp: imageSharp(id: { regex: "/pexels-photo-132340.jpeg/" }) {
          sizes(
            traceSVG: {
              color: "#8d82c4"
              turnPolicy: TURNPOLICY_MINORITY
              blackOnWhite: false
            }
            cropFocus: ATTENTION
            maxWidth: 1000
            toFormat: PNG
          ) {
            tracedSVG
            aspectRatio
            src
            srcSet
            srcWebp
            srcSetWebp
            sizes
          }
        }
        allWordpressPage ${
          devMode ? '' : `(filter: { status: { eq: "publish" } })`
        } {
          edges {
            node {
              slug
              title
              excerpt
              content
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
                      tracedSVG
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
            }
          }
        }
        allWordpressPost
        (
          ${
            devMode
              ? `sort: { fields: [date], order: DESC }`
              : `filter: { status: { eq: "publish" } }
        sort: { fields: [date], order: DESC }`
          }
          ) {
          edges {
            node {
              date(formatString: "YYYY/MM/DD")
              slug
              title
              excerpt
              content
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
                      tracedSVG
                      aspectRatio
                      src
                      srcSet
                      srcWebp
                      srcSetWebp
                      sizes
                    }
                  }
                }
              }
            }
          }
        }
      }
    `

  return new Promise((resolve, reject) => {
    const postTemplate = path.resolve('./src/templates/blog-post.js')
    const blogPageList = path.resolve('./src/templates/blog-list.js')
    const landingByPathTemplate = path.resolve(
      './src/templates/landing-by-path.js'
    )
    resolve(
      graphql(query).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Create blog posts pages.
        _.each(
          _.get(result, 'data.allWordpressPage.edges', []),
          (edge, index) => {
            console.log(edge.node.slug)
            createPage({
              path: edge.node.slug.startsWith('wants-to')
                ? `/${edge.node.slug}`.replace(/-/g, '/')
                : `/${edge.node.slug}`,
              mainImg: _.get(edge, 'node.featured_media.localFile'),
              component: landingByPathTemplate,
              context: {
                slug: edge.node.slug,
                style: ((index + 1) % 6) + 1,
                mainImg: _.get(edge, 'node.featured_media.localFile'),
              },
            })
          }
        )
        if (_.get(result, 'data.allWordpressPost.edges', []).length === 0) {
          createPage({
            path: `/blog/`,
            component: blogPageList,
          })
        } else {
          // console.log(_.get(result, 'data.defaultSharp'))
          createPaginatedPages({
            edges: _.get(result, 'data.allWordpressPost.edges', []).map(
              edge =>
                _.has(
                  edge,
                  'node.featured_media.localFile.childImageSharp.sizes'
                )
                  ? edge
                  : Object.assign({}, edge, {
                      node: Object.assign({}, _.get(edge, 'node', {}), {
                        featured_media: Object.assign(
                          {},
                          _.get(edge, 'node.featured_media', {}),
                          {
                            localFile: Object.assign(
                              {},
                              _.get(edge, 'node.featured_media.localFile', {}),
                              {
                                childImageSharp: Object.assign(
                                  {},
                                  _.get(
                                    edge,
                                    'node.featured_media.localFile.childImageSharp',
                                    _.get(result, 'data.defaultSharp')
                                  )
                                ),
                              }
                            ),
                          }
                        ),
                        frontmatter: Object.assign({}, _.get(edge, 'node', {})),
                      }),
                    })
            ),
            createPage: createPage,
            pageTemplate: blogPageList,
            context: {
              sizes: _.get(result, 'data.defaultSharp.sizes'),
            },
            // pageLength: 5, // This is optional and defaults to 10 if not used
            pathPrefix: 'blog',
          })
        }

        // Create blog posts pages.
        _.each(
          _.get(result, 'data.allWordpressPost.edges', []),
          (edge, index) => {
            // console.log(edge)
            createPage({
              path: `/${edge.node.date}/${edge.node.slug}`,
              mainImg: _.get(edge, 'node.featured_media.localFile'),
              component: postTemplate,
              context: {
                slug: edge.node.slug,
                mainImg: _.get(edge, 'node.featured_media.localFile'),
              },
            })
          }
        )
      })
    )
  })
}
