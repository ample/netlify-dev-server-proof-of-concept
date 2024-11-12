const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const results = await graphql(`
    {
      pages: allContentfulPage {
        edges {
          node {
            __typename
            id
            title
            slug
            meta_data {
              content
              name
            }
          }
        }
      }
    }
  `);

  const { pages } = results.data;
  reporter.info(`Creating ${pages.edges.length} page nodes for ${process.env.GATSBY_SITE_THEME || "default"} theme`);

  pages.edges.map(({ node }) => {
    reporter.info(`Creating page: ${node.slug}`);
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page/index.js`),
      context: {
        id: node.id,
        title: node.title,
        meta_data: node.meta_data,
        siteTheme: process.env.GATSBY_SITE_THEME || "default",
      },
    });
  });
};
