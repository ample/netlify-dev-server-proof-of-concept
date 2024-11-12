/* eslint-disable no-unused-vars */
import React from "react";
import { graphql } from "gatsby";

const FlexiblePage = ({
  data: {
    page: { title },
  },
}) => {
  return <h1>{title}</h1>;
};

export const query = graphql`
  query PageQuery($id: String!) {
    page: contentfulPage(id: { eq: $id }) {
      __typename
      id
      slug
      title
    }
  }
`;

export default FlexiblePage;
