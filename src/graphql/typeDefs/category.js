import { gql } from "apollo-server-express";

export default gql`
    extend type Query {
        getAllCategories (keyword : String)   : [Category]!
        getCategoryById (id : ID!) : Category!
    }

    extend type Mutation {
        createCategory( input : CreateCategoryInput!) : Category! 
        updateCategory( id : ID! , input : CreateCategoryInput!) :Category! 
        deleteCategory( id : ID!) : ID!     
    }

    input CreateCategoryInput {
        name : String!
    }
    
    type Category {
        id : ID!  , 
        name : String! 
    }

`