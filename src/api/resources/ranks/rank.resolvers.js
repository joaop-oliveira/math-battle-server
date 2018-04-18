import Rank from './rank.model';

const getAllByRank = async (_, { rank_name }) => {
    const data = await Rank.find({}).select(rank_name);
    return data[0]
    // console.log(await Rank.find({}));
}



const getPlayerByRank = async (_, { rank_name, user_id }) => {
    const data = await Rank.find({}).select(rank_name).where([{acolyte: user_id}]);
    console.log(data[0].acolyte);
    return data[0];
}


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
        async acolyte (root) {
            const populatedQuery =  await root.populate('acolyte').execPopulate();
            return populatedQuery.acolyte;
        },
        async student (root) {
            const populatedQuery =  await root.populate('student').execPopulate();
            return populatedQuery.players;
        },
        async master (root) {
            const populatedQuery =  await root.populate('master').execPopulate();
            return populatedQuery.players;
        }
    }
};


