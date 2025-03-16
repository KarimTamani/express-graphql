import init from "./database/connection";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import { PORT } from "./config";
import { typeDefs, resolvers } from "./graphql";
import { graphqlUploadExpress } from "graphql-upload"
import { Op, Sequelize } from "sequelize";

// create an express application 
const app = express();

// Apply middleware for handling multipart requests
app.use(graphqlUploadExpress());

var http = Server(app);




const test = async () => {
    const connection = await init();
    /*

    INSERT into database 
    const category = await connection.models.Category.create({
        name : "Clothing"
    }); 
    // create Multiple records at once
    await connection.models.Category.bulkCreate([
        {
            name: "Electronic"
        } , 
        {
            name: "Food"
        } , 
        {
            name: "Test"
        } , 
    ]);
    
    
    */
    // find by id
    //const category = await connection.models.Category.findByPk(2)
    // find all

    var query = "eléc"
    /*
    const categories = await connection.models.Category.findAll( {
        where :{
            name : {
                [Op.like] : "%"+query+"%"
            },
            id : 3
        }
    }) ; 
    
    const categories = await connection.models.Category.findAll( {
        where :{
            [Op.or] : [
                { name : { [Op.like] : "%"+query+"%" }} , 
                { id : 3 }
            ]          
        }
    }) ; 
     */

    /*
    for (const category of categories) { 
        console.log ( category.toJSON())
    } */

    /*
    // update record in the database 
    const category = await connection.models.Category.findByPk(4)
    await category.update({
        name: "Phones"
    }) ; 
    */
    /*
    const category = await connection.models.Category.findByPk(3) ; 
    await category.destroy() ;  
    */
    /*
    // update with one instruction 
    await connection.models.Category.update( {
        name : "Food"
    } , {
        where : {
            id : [2,4]
        }
    }) ; 
    */
    /*
    //delete multiple records
    await connection.models.Category.destroy({
        where : { 
            id : [2 , 4]
        }
    })*/
    /*
    // create wilaya and it baladiats with one request
    const input = {
        name: "Alger",
        baladiat: [{
            name: "Dar El Baida",
            codePostal: "12"
        }, {
            name: "Beb ezouar",
            codePostal: "233",
        }, {
            name: "Harrache",
            codePostal: "22332"
        }]
    };

    const wilaya = await connection.models.Wilaya.create(input, {
        include: [{
            model: connection.models.Baladia,
            as: "baladiat"
        }]
    });

    //console.log ( wilaya) ; 

    ///console.log ( connection.models)


    const alger = await connection.models.Wilaya.findByPk(13 , {
        include: [{
            model: connection.models.Baladia,
            as: "baladiat"
        }]
    })   
    // find all with include association & offset & limit 
    const wilays = await connection.models.Wilaya.findAll({
        include: [{
            model: connection.models.Baladia,
            as: "baladiat" , 
        }] , 
        limit : [3 , 2]
    })
    for ( const wilaya of wilays) {
        console.log (wilaya.toJSON())
    }
    */

    /*
    const input = {
        firstName: "Name",
        lastName: "Last name",
        email: "test@gmail.com", /// Good 
        password: "123",
  
        age: 25,
        type: "seller",
        address: {
            streetLine: "Dar El Baida 3 Eme etage",
            latitude: 2.3,
            long: 23.4, /// ERORR X 
            baladiaId: 1
        },
        stores: [{
            name: "Phone Store ",
            bio: "The best store ever",
            rating: 0,
        }]
    };


    const t = await connection.transaction();
    try {

        await connection.models.User.create(input, {
            include: [{
                model: connection.models.Address,
                as: "address"
            }, {
                model: connection.models.Store,
                as: "stores",
            
            }],
            transaction: t
        });

        await t.commit() ; 
    } catch (error) {
        await t.rollback() ; 
   
    }*/


    const users = await connection.models.User.findAll({
        include : [{
            model : connection.models.Address , 
            as : "address" , 
            include  : [{
                model : connection.models.Baladia  ,
                as : "baladia" , 
                include : [{
                    model : connection.models.Wilaya  ,
                    as : "wilaya"
                }]
            }] 
        } , {
            model : connection.models.Store , 
            as : "stores" , 
        }]
    }); 

    for ( const user of users) { 
        console.log ( user.toJSON())
    }
}



test()

/*
// listen to the given port from the config file 
http.listen(PORT, async () => {
    try {
        // init sequelize connection with db and load all models


 
        

        // create apollo server with the type defs and the resolvers 
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers  ,
            context: ({ }) => {
                return {
                    models: connection.models,
                    connection
                }
            },
        });
        await apolloServer.start();
        // apply the apollo server as middleware 
        apolloServer.applyMiddleware({ app });

        console.log(`Server is runing on port ${PORT}`);
    } catch (error) {
        console.log("Error : ", error);
    }
})

*/