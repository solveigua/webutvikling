/**
 * Server connection to backend
 * Utilizes mongoose and ApolloServer
 */
import express from "express";
import { ApolloServer } from "apollo-server-express";
import mongoose from "mongoose";
import { resolvers } from "./resolvers";
import typeDefs from "./typeDefs";

async function startServer() {
  try {
    const app = express();
    const apolloserver = new ApolloServer({
      typeDefs: typeDefs,
      resolvers: resolvers,
    });

    await apolloserver.start();

    apolloserver.applyMiddleware({ app: app });

    app.use((req: express.Request, res: express.Response) => {
      res.send("Hello from express apollo server");
    });

    await mongoose
      .connect(
        "mongodb://solveig:aune@it2810-19.idi.ntnu.no:27017/marvel?authSource=marvel&readPreference=primary&appname=MongoDB%20Compass&ssl=false",
        {
          // useUnifiedTopology: true,
          // useNewUrlParser: true,
        }
      )
      .then(() => {
        console.log("Mongoose connected successfully");
      });

    app.listen(4002, () => console.log("server is running on port 4002"));
  } catch (err) {
    console.log("caugth error", err);
  }
}

startServer();
