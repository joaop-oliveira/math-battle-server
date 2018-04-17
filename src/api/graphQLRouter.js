import { makeExecutableSchema } from 'graphql-tools';
import { playerType, playerResolvers } from './resources/player';
import { clanTypes, clanResolvers } from './resources/clan/';
import { rankResolvers, rankTypes } from './resources/ranks';
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
  typeDefs: [baseSchema, playerType, clanTypes, rankTypes, schoolTypes],
  resolvers: merge({}, playerResolvers, clanResolvers, schoolsResolvers, rankResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}));
