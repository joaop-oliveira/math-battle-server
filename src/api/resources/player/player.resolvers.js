import Player from './player.model'

const getAllPlayers = async () =>
    await Player.find({}).exec();

const getPlayer = async (_, {_id}) =>
    await Player.findById(_id).exec();

const updatePlayer = async (_, {_id, input}) => {
    const updatedPlayer = await Player.findByIdAndUpdate(input._id, {$set: input}).exec();
    return updatedPlayer;
};

const deactivatePlayer = async (_, {_id}) => {
    const deactivatedPlayer = await Player.findByIdAndUpdate(_id, {$set : {active: false}}).exec();
    return deactivatedPlayer;
};

export const playerResolvers = {
    Query: {
        getAllPlayers,
        getPlayer
    },
    Mutation: {
        updatePlayer,
        deactivatePlayer
    }
};
