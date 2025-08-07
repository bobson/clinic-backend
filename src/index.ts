import { createServer } from "http";
import { createYoga } from "graphql-yoga";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "./graphql/schema";
import { resolvers } from "./graphql/resolvers";
import { connectDB } from "./lib/db";
import dotenv from "dotenv";

dotenv.config();

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/graphql",
});

const server = createServer(yoga.requestListener);

const PORT = process.env.PORT || 4000;

connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(
        `🚀 GraphQL Server running at http://localhost:${PORT}/graphql`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
  });
