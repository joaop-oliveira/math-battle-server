import Rank from './rank.model';
import Clan from "../clan/clan.model";

const getAllByRank = async (_, { rank_name }) =>
  await Rank.find({}).select(rank_name);

const getPlayerByRank = async (_, { rank_name, user_id }) =>
    await Rank.find({}).select(rank_name).where({_id: user_id});

const insertPlayer = async (_, { input }) =>
    await Rank.create(input);

 const updatePlayer = async (_, {rank_name, user_id}) =>
     await Rank.find({}).select(rank_name).where({_id: user_id});

export const rankResolvers = {
    Query: {
        getAllByRank,
        getPlayerByRank
    },
    Mutation: {
        insertPlayer,
        updatePlayer
    },
    Clan: {
        async users (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('users').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.users;
        }
    }
};


