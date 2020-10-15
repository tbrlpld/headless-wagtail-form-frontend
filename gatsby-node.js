const { createWagtailPages } = require('gatsby-source-wagtail/pages.js')

exports.createPages = ({ graphql, actions }) => {
  return createWagtailPages(
    {
      'home.HomePage': 'templates/home.js',
      'content.SomePage': 'templates/some.js'
    },
    graphql,
    actions,
    []
  )
}
