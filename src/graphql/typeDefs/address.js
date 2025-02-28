import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getAddressbyId(id : ID!) : Address!
        getAddresses : [Address!]!
    }

    extend type Mutation {
        createAddress (createAddress : CreateAddress!) : Address!  
        updateAddress (updateAddressInput : UpdateAddressInput!,id : ID!) : Address!  
        deleteAddress (id : ID!) : ID!  
    }

    input CreateAddress {
        street : String!,
        latit : Float,
        longt : Float,
        userId : ID,
        cityId : ID
    }

    input UpdateAddressInput {
        street : String,
        latit : Float,
        longt : Float,
        userId : ID,
        cityId : ID
    }

    type Address {
        id : ID!,
        street : String!,
        latit : Float,
        longt : Float,
        createdAt : String!,
        updatedAt : String!,
        userId : ID!,
        cityId : ID!,
        city : City
    }

`;
