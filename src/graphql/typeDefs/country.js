import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getCountrybyId(id : ID!) : Country!
        getCountries : [Country!]!
    }

    extend type Mutation {
        createCountry (createCountryInput : [CreateCountryInput!]!) : [Country!]!  
        updateCountry (updateCountryInput : UpdateCountryInput!,id : ID!) : Country!  
        deleteCountry (id : [ID!]!) : [ID!]!  
    }

    input CreateCountryInput {
        name : String!,
        cities : [CreateCityInput!]
    }

    input UpdateCountryInput {
        name : String
    }

    type Country {
        id : ID!,
        name : String!,
        createdAt : String!,
        updatedAt : String!
    }

`;
