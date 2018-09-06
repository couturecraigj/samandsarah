require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})
const devMode = process.env.NODE_ENV !== 'production'
const author = process.env.SITE_AUTHOR || 'Wullbrandts'
const wordPressOriginShort = process.env.WORDPRESS_ORIGIN_SHORT
const wordPressOriginLong =
  process.env.WORDPRESS_ORIGIN_LONG ||
  'https://samandsarahministry.wordpress.com/'
const description = process.env.SITE_DESCRIPTION || ''
const name = process.env.SITE_TITLE || 'Wullbrandt Croatia Ministry'
const short_name = process.env.SITE_SHORT_TITLE || 'Wullbrandt Ministry'
const siteUrl =
  process.env.LONG_SITE_URL || 'https://www.wullbrandt-croatia-ministry.com'

module.exports = {
  siteMetadata: {
    title: name,
    author,
    description,
    siteUrl,
    backgroundImage: './src/assets/images/pexels-photo-185699.jpeg',
  },
  pathPrefix: '/',
  plugins: [
    // 'gatsby-plugin-extract-schema',
    `gatsby-plugin-react-next`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/posts`,
        name: 'posts',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          `gatsby-remark-autolink-headers`,
          'gatsby-remark-copy-linked-files',
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-125372328-1',
        // Setting this parameter is optional
        // anonymize: true,
      },
    },
    `gatsby-transformer-sharp`,
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        baseUrl: wordPressOriginShort,
        protocol: 'https',
        hostingWPCOM: true,
        auth: {
          // in order to do that you need to create an app (of type Web) at https://developer.wordpress.com/apps/
          // then add your clientId, clientSecret, username, and password here
          wpcom_app_clientSecret: process.env.WORDPRESS_CLIENT_SECRET,
          wpcom_app_clientId: process.env.WORDPRESS_CLIENT_ID,
          wpcom_user: process.env.WORDPRESS_USER,
          wpcom_pass: process.env.WORDPRESS_PASSWORD,
        },
        // Set verboseOutput to true to display a verbose output on `npm run develop` or `npm run build`
        // It can help you debug specific API Endpoints problems.
        verboseOutput: false,
        // Set how many pages are retrieved per API request.
        perPage: 100,
        // Search and Replace Urls across WordPress content.
        searchAndReplaceContentUrls: {
          sourceUrl: wordPressOriginLong,
          replacementUrl: devMode ? 'http://localhost:8000/' : siteUrl + '/',
        },
        // Set how many simultaneous requests are sent at once.
        concurrentRequests: 10,
        // Exclude specific routes using glob parameters
        // See: https://github.com/isaacs/minimatch
        // Example:  `["/*/*/comments", "/yoast/**"]` will exclude routes ending in `comments` and
        // all routes that begin with `yoast` from fetch.
        excludedRoutes: ['/*/*/comments', '/yoast/**'],
        // use a custom normalizer which is applied after the built-in ones.
        normalizer: function({ entities }) {
          return entities
        },
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sass`,
    `gatsby-plugin-styled-components`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name,
        short_name,
        start_url: '/',
        background_color: '#242943',
        theme_color: '#9bf1ff',
        display: 'minimal-ui',
        icons: [
          {
            // Everything in /static will be copied to an equivalent
            // directory in /public during development and build, so
            // assuming your favicons are in /static/favicons,
            // you can reference them here
            src: `/android-chrome-192x192.png`,
            sizes: `192x192`,
            type: `image/png`,
          },
          {
            src: `/android-chrome-512x512.png`,
            sizes: `512x512`,
            type: `image/png`,
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            query: `
            {
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
            }
          }
        }
      }
            `,
            serialize: ({ query: { site, allWordpressPost } }) => {
              return allWordpressPost.edges.map(edge => {
                // console.log(edge, site)
                const path = (
                  site.siteMetadata.siteUrl +
                  '/' +
                  edge.node.date +
                  '/' +
                  edge.node.slug
                ).replace(/([^:])\/(\/)/g, '$1$2')
                return Object.assign({}, edge.node, {
                  description: edge.node.excerpt,
                  url: path,
                  guid: path,
                  custom_elements: [{ 'content:encoded': edge.node.content }],
                })
              })
            },
            output: '/rss.xml',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-sitemap`,
    },
    `gatsby-plugin-offline`,
    'gatsby-plugin-netlify-cache',
  ],
}
