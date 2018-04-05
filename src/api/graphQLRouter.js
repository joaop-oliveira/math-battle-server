import { makeExecutableSchema } from 'graphql-tools';
import { userType, userResolvers } from './resources/user';
import { clanTypes, clanResolvers } from './resources/clan/';
import merge from 'lodash.merge';
import { graphqlExpress } from 'apollo-server-express';

const baseSchema = `
  schema { 
    query: Query
    mutation: Mutation
  }
`;

const schema = makeExecutableSchema({
  typeDefs: [baseSchema, userType, clanTypes],
  resolvers: merge({}, userResolvers, clanResolvers)
});

export const graphQLRouter = graphqlExpress(req => ({
  schema,
  context: {
    req,
    user: req.user
  }
}));
