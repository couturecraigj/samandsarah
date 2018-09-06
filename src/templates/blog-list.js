import React from 'react'
import { get, has } from 'lodash'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'

const Pagination = ({ index, pageCount, group }) => {
  if (index === 1 && index === pageCount) return null
  const before = index !== 1
  const prevUrl = index - 1 === 1 ? `/blog` : `/blog/${index - 1}`
  const after = index !== pageCount
  const nextUrl = index === pageCount ? '#' : `/blog/${index + 1}`
  return (
    <section className="special">
      <ul className="pagination">
        <li>
          {before ? (
            <Link
              to={prevUrl}
              className={`button small ${!before ? 'disabled' : ''}`}
            >
              Prev
            </Link>
          ) : (
            <span className={`button small ${!before ? 'disabled' : ''}`}>
              Prev
            </span>
          )}
        </li>
        {before ? (
          <li>
            <Link to={prevUrl} className={`page`}>
              {index - 1}
            </Link>
          </li>
        ) : null}
        <li>
          <span className={`page active`}>{index}</span>
        </li>
        {after ? (
          <li>
            <Link to={`/blog/${index + 1}`} className={`page`}>
              {index + 1}
            </Link>
          </li>
        ) : null}
        <li>
          {after ? (
            <Link
              to={nextUrl}
              className={`button small ${!after ? 'disabled' : ''}`}
            >
              Next
            </Link>
          ) : (
            <span className={`button small ${!before ? 'disabled' : ''}`}>
              Next
            </span>
          )}
        </li>
      </ul>
    </section>
  )
}

const BlogListTemplate = props => {
  console.log(props)
  const { data, pathContext } = props
  const { group = [], index = 1, first, last, pageCount = 1 } = pathContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  return (
    <div>
      <Helmet>
        <title>Blog</title>
        <meta name="description" content="Blog Page" />
      </Helmet>

      <div id="main">
        <section id="two" className="spotlights">
          {group.length ? (
            group.map(({ node }) => (
              <section key={node.slug}>
                <Link to={`/${node.date}/${node.slug}`} className="image">
                  {has(
                    node,
                    'featured_media.localFile.childImageSharp.sizes'
                  ) ? (
                    <Img
                      sizes={get(
                        node,
                        'featured_media.localFile.childImageSharp.sizes'
                      )}
                      alt=""
                    />
                  ) : null}
                </Link>
                <div className="content">
                  <div className="inner">
                    <header className="major">
                      <h3 dangerouslySetInnerHTML={{ __html: node.title }} />
                    </header>
                    <div dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                    <ul className="actions">
                      <li>
                        <Link
                          to={`/${node.date}/${node.slug}`}
                          className="button"
                        >
                          READ ON
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>
            ))
          ) : (
            <section>
              <div className="content">
                <div className="inner">
                  <header className="major">
                    <h1>I have not posted anything just yet</h1>
                  </header>
                  <p>This will be updated soon</p>
                </div>
              </div>
            </section>
          )}

          <Pagination index={index} pageCount={pageCount} group={group} />
        </section>
      </div>
    </div>
  )
}

export default BlogListTemplate
