import init from "./database/connection";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import { PORT } from "./config";
import { typeDefs, resolvers } from "./graphql";
// create an express application 
const app = express();


var http = Server(app);


// listen to the given port from the config file 
http.listen(PORT, async () => {
    try {
        // init sequelize connection with db and load all models
        const connection = await init();

        // create apollo server with the type defs and the resolvers 
        const apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
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