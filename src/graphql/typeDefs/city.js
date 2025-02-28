import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getCitybyId(id : ID!) : City
        getCities : [City!]!
        getCityByCountry(countryId : ID!) : City
    }

    extend type Mutation {
        createCity (createCityInput : [CreateCityInput!]!) : [City!]!  
        updateCity (updateCityInput : UpdateCityInput!,id : ID!) : City!  
        deleteCity (id : ID!) : ID!  
    }

    input CreateCityInput {
        name : String!,
        cityCode : String!,
        countryId : ID
    }

    input UpdateCityInput {
        name : String,
        cityCode : String,
        countryId : ID
    }

    type City {
        id : ID!,
        name : String!,
        cityCode : String!,
        countryId : ID!,
        country : Country
    }

`;
