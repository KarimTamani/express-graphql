import init from "./database/connection";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import { PORT } from "./config";

// create an express application 
const app = express();



var http = Server(app);
// create apollo server with the type defs and the resolvers 
//const apolloServer = new ApolloServer({});

// listen to the given port from the config file 
http.listen(PORT, async() => {
    try {
  //      await apolloServer.start() ;
        // apply the apollo server as middleware 
    //    apolloServer.applyMiddleware({ app });

        console.log(`Server is runing on port ${PORT}`)
    } catch (error) {
        console.log("Error : ", error)
    }
})