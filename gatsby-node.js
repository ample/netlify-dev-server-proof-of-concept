const path = require("path");

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;
  const results = await graphql(`
    {
      pages: allContentfulPage {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  const { pages } = results.data;
  reporter.info(`Creating ${pages.edges.length} page nodes`);
  pages.edges.map(({ node }) => {
    reporter.info(`Creating page: ${node.slug}`);
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/page/index.js`),
      context: {
        id: node.id,
      },
    });
  });
};
