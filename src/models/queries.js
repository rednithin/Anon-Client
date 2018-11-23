import gql from "graphql-tag";

export const ME = gql`
  {
    me {
      id
      name
      email
      description
      questions {
        id
        query
      }
    }
  }
`;

export const SIGNUP = gql`
  mutation SignUp(
    $name: String!
    $description: String!
    $password: String!
    $email: String!
  ) {
    signup(
      name: $name
      description: $description
      password: $password
      email: $email
    ) {
      id
      name
      email
      description
      questions {
        id
        query
      }
    }
  }
`;

export const SIGNIN = gql`
  query SignIn($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      name
      email
      description
      questions {
        id
        query
      }
    }
  }
`;

export const ADD_QUESTION = gql`
  mutation AddQuestion($query: String!, $isPublic: Boolean!) {
    addQuestion(query: $query, isPublic: $isPublic) {
      id
      query
      isPublic
    }
  }
`;

export const GET_QUESTIONS = gql`
  {
    questions {
      id
      query
      isPublic
      responses {
        id
        response
      }
    }
  }
`;

export const ADD_RESPONSE = gql`
  mutation AddResponse($response: String!, $questionID: ID!) {
    addResponse(response: $response, questionID: $questionID) {
      response
    }
  }
`;

export const GET_QUESTION = gql`
  query GetQuestion($questionID: ID!) {
    question(questionID: $questionID) {
      query
      isPublic
      responses {
        response
      }
    }
  }
`;
