import React from 'react'
import { graphql } from 'gatsby'

export default function ({ data }) {
  const page = data.wagtail.page
  const contactForm = page.contactForm
  return (
    <>
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.intro }} />
    </>
  )
}

export const query = graphql`
  query ($slug: String) {
    wagtail {
      page(slug: $slug) {
        id
        title
        ... on SomePage {
          intro
          contactForm {
            title
            intro
            thankYouText
            formFields {
              choices
              cleanName
              defaultValue
              fieldType
              helpText
              id
              label
              required
              sortOrder
            }
          }
        }
      }
    }
  }
`
