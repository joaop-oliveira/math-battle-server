import express from "express";
import setupMiddware from "./middleware";
import { signin, verifyToken, signup } from "./lib/auth";
import { connect } from "./config/db";
import { graphQLRouter } from "./api/graphQLRouter";
import { graphiqlExpress } from "apollo-server-express";
// Declare an app from express
const app = express();

setupMiddware(app);
connect();
// setup basic routing for index route

app.use("/signin", signin);
app.post("/signup", (req, res) => {
    signup(req, res);
});
app.get("/test", (req, res) => {
    verifyToken(req, res);
});
app.use("/graphql", graphQLRouter);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));


export default app;
