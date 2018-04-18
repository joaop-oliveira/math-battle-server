import { makeExecutableSchema } from 'graphql-tools';
import { playerType, playerResolvers } from './resources/player';
import { clanTypes, clanResolvers } from './resources/clan/';
import { schoolsResolvers, schoolTypes } from "./resources/schools";
import merge from 'lodash.merge';
import { graphqlExpress } from 'apollo-server-express';

const baseSchema = `
  schema { 
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, playerType, clanTypes, schoolTypes],
  resolvers: merge({}, playerResolvers, clanResolvers, schoolsResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}));
