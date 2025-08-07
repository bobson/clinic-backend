"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const graphql_yoga_1 = require("graphql-yoga");
const schema_1 = require("@graphql-tools/schema");
const schema_2 = require("./graphql/schema");
const resolvers_1 = require("./graphql/resolvers");
const db_1 = require("./lib/db");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: schema_2.typeDefs,
    resolvers: resolvers_1.resolvers,
});
const yoga = (0, graphql_yoga_1.createYoga)({
    schema,
    graphqlEndpoint: "/graphql",
});
const server = (0, http_1.createServer)(yoga.requestListener);
const PORT = process.env.PORT || 4000;
(0, db_1.connectDB)()
    .then(() => {
    server.listen(PORT, () => {
        console.log(`🚀 GraphQL Server running at http://localhost:${PORT}/graphql`);
    });
})
    .catch((err) => {
    console.error("❌ Failed to connect to MongoDB", err);
    process.exit(1);
});
