import User from './user.model'

const getAllUsers = async () =>
    await User.find({}).exec();

const getCurrentUser = async (_, __, {user}) =>
    await User.findById(user._id).exec();

const getUser = async (_, {_id}) =>
    await User.findById(_id).exec();

const updateUser = async (_, {_id, input}) => {
    const updatedUser = await User.findByIdAndUpdate(input._id, {$set: input}).exec();
    return updatedUser;
};

const deactivateUser = async (_, {_id}) => {
    const deactivatedUser = await User.findByIdAndUpdate(_id, {$set : {active: false}}).exec();
    return deactivatedUser;
};

export const userResolvers = {
    Query: {
        getAllUsers,
        getUser,
        getCurrentUser
    },
    Mutation: {
        updateUser,
        deactivateUser
    }
};
