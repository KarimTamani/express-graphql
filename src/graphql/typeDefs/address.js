


import { gql } from "apollo-server-express";

export default gql`
   

    type Address {
        id : ID! 
        streetLine : String! 
        latitude : Float! 
        long : Float! 
        baladia :  Baladia! 
    }

    input CreateAddressInput {
        streetLine : String! 
        latitude : Float! 
        long : Float! 
        baladiaId : ID! 
    }

    type Baladia {
        id : ID! 
        name : String! 
        codePostal : String!
        wilaya : Wilaya!
    }

    type Wilaya {
        id : ID!
        name : String! 
    }
   

`