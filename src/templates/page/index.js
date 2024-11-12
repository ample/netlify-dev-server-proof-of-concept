/* eslint-disable no-unused-vars */
import React from "react";
import { graphql } from "gatsby";

const FlexiblePage = (props) => {
  return <pre>{JSON.stringify(props.data, null, 2)}</pre>;
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
