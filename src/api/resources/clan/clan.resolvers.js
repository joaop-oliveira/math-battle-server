import Clan from './clan.model';

const getAllClans = async () => await Clan.find({}).exec();

const getClan = async (_, { _id }) => await Clan.findById(_id).exec();

const updateClan = async (_, { _id, input }) => {
    const updatedClan = await Clan.findByIdAndUpdate(input._id, { $set: input }).exec();
    return updatedClan;
};

const createClan = async (_, { input }) => {
    const newClan = await Clan.create(input);
    console.log(newClan);
    if (!newClan) {
        throw new Error('Could not create the Clan');
    }
    return newClan;
};

const insertMember = async (_, { _id }) => {
    const updatedClan = await Clan.findByIdAndUpdate(_id, { $set: { players: { _id } } }).exec();
    if (!updatedClan) {
        throw new Error('Could not update the Clan' + updatedClan);
    }
    return updatedClan;
};

const deactivateClan = async (_, { _id }) => {
    const deactivatedClan = await Clan.findByIdAndUpdate(_id, { $set: { active: false } }).exec();
    return deactivatedClan;
};

export const clanResolvers = {
    Query: {
        getAllClans,
        getClan
    },
    Mutation: {
        updateClan,
        createClan,
        insertMember,
        deactivateClan
    },
    Clan: {
        async players (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('players').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.users;
        }
    }
};
