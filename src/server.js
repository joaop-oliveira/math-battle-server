import express from "express";
import setupMiddware from "./middleware";
import { verifyUser, authorize, signup } from "./lib/auth";
import { connect } from "./config/db";
import { graphQLRouter } from "./api/graphQLRouter";
import { graphiqlExpress } from "apollo-server-express";
// Declare an app from express
const app = express();

setupMiddware(app);
connect();
// setup basic routing for index route

app.use("/signin", verifyUser);
app.post("/signup", (req, res) => {
    signup(req, res);
});

app.get("/test", authorize, (req, res) => {
    res.send("authorized")
});
app.use("/graphql", graphQLRouter);
app.use("/docs", graphiqlExpress({ endpointURL: "/graphql" }));


export default app;
