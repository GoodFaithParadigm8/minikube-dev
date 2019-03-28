import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";

import gql from "graphql-tag";

import "./styles.css";

/**
 *                  Serverless
 *      If you get errors wait a few and try back,
 *            Lambda might need to warm up
 */

const client = new ApolloClient({
  clientState: {
    defaults: {
      isConnected: true
    }
  },
  fetchOptions: { method: "GET" },
  uri: "https://writting-test-9j2wvjofz.now.sh/graphql"
});

const GET_POST = gql`
  query {
    post {
      title
      body
    }
  }
`;

const Me = () => (
  <Query
    errorPolicy="all"
    query={gql`
      {
        me {
          name
          email
        }
      }
    `}
  >
    {({ loading, data: { me } }) => {
      if (loading) return <span>loading....</span>;
      if (err => console.log(err.message));
      return (
        <h2>
          Welcome back {me.name} <br /> {me.email}
        </h2>
      );
    }}
  </Query>
);

const Post = () => (
  <Query query={GET_POST}>
    {({ loading, data: { post } }) => {
      if (loading) return <span>loading....</span>;
      if (err => console.log(err.message));
      return (
        <>
          <h2>{post.title}</h2> <h3>{post.body}</h3>
        </>
      );
    }}
  </Query>
);

ReactDOM.render(
  <ApolloProvider client={client}>
    <div>
      <h3>
        {" "}
        <span role="img" aria-label="">
          ***** Work In Progress ***** <br />
          <br />
          🚀 <br />{" "}
        </span>
      </h3>
    </div>
    <Me />
    <Post />
  </ApolloProvider>,
  document.getElementById("root")
);
