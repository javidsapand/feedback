
import gql from 'graphql-tag';

export function GET_AUTH_TOKEN() {
    return gql`
    mutation GET_AUTH_TOKEN($username: String!, $password: String!) {
        tokenAuth(username: $username, password: $password) {
            token
        }
    }`;
}

