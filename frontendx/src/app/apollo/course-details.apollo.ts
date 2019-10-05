import gql from 'graphql-tag';

export function GET_COURSE() {
  return  gql`
  query GET_COOURSE($id:String) {
  courseById(id:$id) {
    id
    timestamp
    title
    description
    isOwner
    isApplaid
    hasEntryTest
    hasPrerequisites
    myProgress
    image {
      src
    }
    entryTest {
      id
      timestamp
      questions {
        edges {
          node {
            id
            type
            summary
          }
        }
      }
    }
    prerequisites {
      edges {
        node {
          id
          title
          description
          myProgress
        }
      }
    }
    modules {
      edges {
        node {
          id
          title
          description
          image {
            src
          }
          myProgress
        }
      }
    }
    instructors {
      edges {
        node {
          id
          firstName
          lastName
          avatar {
            src
          }
        }
      }
    }
  }
}
`;
}

