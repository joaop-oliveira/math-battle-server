import Rank from './rank.model';
import Clan from "../clan/clan.model";

const getAllByRank = async (_, { rank_name }) =>
  await Rank.find({}).select(rank_name);

const getPlayerByRank = async (_, { rank_name, user_id }) =>
    await Rank.find({}).select(rank_name).where({_id: user_id});

const insertPlayer = async (_, { user_id }) =>{
    const data = await Rank.create({ acolyte: { _id: user_id } });
    return data;
}



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
    Rank: {
        async acolyte (rank) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await rank.populate('acolyte').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.players;
        },
        async student (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('student').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.players;
        },
        async master (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('master').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.players;
        }
    }
};


