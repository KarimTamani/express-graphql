import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getInterestbyId(id : ID!) : Interest!
        getInterests : [Interest!]!
    }

    extend type Mutation {
        createInterest (createInterestInput : [CreateInterestInput!]!) : [Interest!]!  
        updateInterest (updateInterestInput : UpdateInterestInput!,id : ID!) : Interest!  
        deleteInterest (id : [ID!]!) : [ID!]!  
    }

    input CreateInterestInput {
        label : String!
    }

    input UpdateInterestInput {
        label : String
    }

    type Interest {
        id : ID!,
        label : String!,
        createdAt : String!,
        updatedAt : String!
    }

`;
