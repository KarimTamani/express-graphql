import { gql } from "apollo-server-express";
export default gql`

    extend type Query {
        getUserByEmail(id : ID!) : User
        getUsers(isActive : Boolean,name : String,status : UserStatus) : [User!]!
    }

    extend type Mutation {
        createUser (createUserInput : CreateUserInput!) : User!  
        updateUser (updateUserInput : UpdateUserInput!,id : ID!) : User!  
        deleteUser (id : [ID!]) : ID!  
    }

    input CreateUserInput {
        name : String!,
        lastname : String!,
        bio : String,
        birthday : String!,
        age : Int,
        email : String!,
        password : String!,
        phoneNumber : String,
        status : UserStatus!,
        profilePicture : Upload,
        userInterests : [CreateUserInterestsInput!],
        address : [CreateAddress!],
        interests : [CreateInterestInput!]
    }

    input UpdateUserInput {
        name : String,
        lastname : String,
        bio : String,
        birthday : String,
        age : Int,
        score : Float,
        rating : Float,
        email : String,
        password : String,
        phoneNumber : String,
        status : UserStatus,
        profilePicture : Upload,
        isActive : Boolean,
        userInterests : [UpdateUserInterestsInput!],
        address : [UpdateAddressInput!],
        interests : [UpdateInterestInput!]
    }

    type User {
        id : ID!,
        name : String!,
        lastname : String!,
        bio : String,
        birthday : String!,
        age : Int,
        score : Float,
        rating : Float,
        email : String!,
        password : String!,
        phoneNumber : String,
        status : UserStatus,
        profilePicture : String,
        updatedAt : String!,
        isActive : Boolean,
        createdAt : String!,
        address : Address,
        interests : [Interest!]
    }

    enum UserStatus {
        developer
        user
        manager
        admin
    }
`;
