


import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getUsers : [User!]!
    }

    extend type Mutation {
        createUser(input : CreateUserInput!) : User! 
    }


    input CreateUserInput {
        firstName : String! 
        lastName : String! 
        email : String! 
        password : String! 
        age : Int!
        type : UserType! 
        address : CreateAddressInput 
    }

    type User {
        id : ID! 
        firstName : String! 
        lastName : String! 
        email : String! 
        age : Int!
        type : UserType! 
        address : Address
    }

    enum UserType {
        buyer 
        seller 
        admin
    }
    

`