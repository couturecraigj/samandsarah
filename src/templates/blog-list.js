import React from 'react'
import { get, has } from 'lodash'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Img from 'gatsby-image'
import BlogList from '../components/BlogList'

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
  const { data, pathContext } = props
  const { group = [], index = 1, first, last, pageCount = 1 } = pathContext
  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString()
  const nextUrl = (index + 1).toString()
  const closingComponent = () => (
    <Pagination index={index} pageCount={pageCount} group={group} />
  )
  return (
    <div>
      <Helmet>
        <title>Blog</title>
        <meta name="description" content="Blog Page" />
      </Helmet>

      <div id="main">
        <h1>Blog</h1>
        <section id="two" className="spotlights">
          <BlogList edges={group} closingComponent={closingComponent} />
        </section>
      </div>
    </div>
  )
}

export default BlogListTemplate
