import { ApolloError } from "apollo-server-express"




const UserResolver =  {
    Query :{
        getUsers : async ( _ , {  } , { models}) => {
            
        
            try { 
                return await models.User.findAll({
                    include : [{
                        model : models.Address , 
                        as : "address"  , 
                        
                        include : [{
                            model : models.Baladia , 
                            as : "baladia" , 
                            include : [{
                                model : models.Wilaya , 
                                as : "wilaya"
                            }]
                        }]
                    }]
                }) ; 
            }catch(error) { 
                return ApolloError(error.message) ; 
            }
        }
    } , 
    Mutation : { 
        createUser : async ( _ , { input } , { models}) => { 
            try { 

                return await models.User.create ( input , {
                    include :  [{
                        model : models.Address , 
                        as : "address"
                    }]
                }) ; 
            }catch(error) { 
                return ApolloError(error.message) ; 
            }
        }
    }
}


export default UserResolver ; 