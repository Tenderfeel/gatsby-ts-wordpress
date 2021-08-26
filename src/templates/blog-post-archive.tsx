import React from 'react'
import { Link, graphql, PageProps } from 'gatsby'
import parse from 'html-react-parser'

import Bio from '../components/bio'
import Layout from '../components/layout'
import Seo from '../components/seo'

type PageContext = {
  offset: number
  nextPagePath: string
  previousPagePath: string
}

const BlogIndex: React.FC<PageProps<GatsbyTypes.Query, PageContext>> = ({
  data,
  pageContext: { nextPagePath, previousPagePath },
}: PageProps<GatsbyTypes.Query, PageContext>): JSX.Element => {
  const posts = data.allWpPost.nodes

  if (!posts.length) {
    return (
      <Layout isHomePage>
        <Seo title='All posts' />
        <Bio />
        <p>
          No blog posts found. Add posts to your WordPress site and they'll
          appear here!
        </p>
      </Layout>
    )
  }

  return (
    <Layout isHomePage>
      <Seo title='All posts' />

      <Bio />

      <ol style={{ listStyle: `none` }}>
        {posts.map(post => {
          const title = post.title as string
          const uri = post.uri as string
          const excerpt = post.excerpt as string

          return (
            <li key={uri}>
              <article
                className='post-list-item'
                itemScope
                itemType='http://schema.org/Article'
              >
                <header>
                  <h2>
                    <Link to={uri} itemProp='url'>
                      <span itemProp='headline'>{parse(title)}</span>
                    </Link>
                  </h2>
                  <small>{post.date}</small>
                </header>
                <section itemProp='description'>{parse(excerpt)}</section>
              </article>
            </li>
          )
        })}
      </ol>

      {previousPagePath && (
        <>
          <Link to={previousPagePath}>Previous page</Link>
          <br />
        </>
      )}
      {nextPagePath && <Link to={nextPagePath}>Next page</Link>}
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query WordPressPostArchive($offset: Int!, $postsPerPage: Int!) {
    allWpPost(
      sort: { fields: [date], order: DESC }
      limit: $postsPerPage
      skip: $offset
    ) {
      nodes {
        excerpt
        uri
        date(formatString: "MMMM DD, YYYY")
        title
        excerpt
      }
    }
  }
`
