import React from 'react'
import { Link, graphql } from 'gatsby'

export default function ({ data }) {
  const wagtailPages = data.wagtail.pages.filter(item => item.contentType === 'content.SomePage')
  const wagtailPageLinks = wagtailPages.map((item) => <Link key={item.id} to={item.url}>{item.title}</Link>)
  return (
    <>
      <h1>{data.wagtail.page.title}</h1>
      <h2>Wagtail Pages</h2>
      {wagtailPageLinks}
      <h2>Other Pages</h2>
      <Link to='react-forms'>React Forms</Link>
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    wagtail {
      page(slug: $slug) {
        id
        title
      }
      pages {
        id
        title
        url
        contentType
      }
    }
  }
`
