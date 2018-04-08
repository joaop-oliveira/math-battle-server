import { makeExecutableSchema } from 'graphql-tools';
import { userType, userResolvers } from './resources/user';
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
  typeDefs: [baseSchema, userType, clanTypes, rankTypes, schoolTypes],
  resolvers: merge({}, userResolvers, clanResolvers, schoolsResolvers, rankResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}));
