import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getUserInterestsById : UserInterests!
        getUserInterests : [UserInterests!]!
    }

    extend type Mutation {
        createUserInterests (createUserInterestsInput : CreateUserInterestsInput!) : UserInterests!  
        updateUserInterests (updateUserInterestsInput : UpdateUserInterestsInput!) : UserInterests!  

    }

    input CreateUserInterestsInput {
        userId : ID,
        interestId : ID
    }

    input UpdateUserInterestsInput {
        userId : ID,
        interestId : ID
    }

    type UserInterests {
        userId : ID!,
        interestId : ID!
    }

`;
