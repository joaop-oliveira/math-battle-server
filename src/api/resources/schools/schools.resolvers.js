import School from './schools.model';

const getAllSchools = async () => await School.find({}).exec();

const getSchool = async (_, { _id }) => await School.findById(_id).exec();

const updateSchool = async (_, { _id, input }) => {
    const updatedSchool = await School.findByIdAndUpdate(input._id, { $set: input }).exec();
    return updatedSchool;
};


const insertMember = async (_, { _id }) => {
    const updatedSchool = await School.findByIdAndUpdate(_id, { $set: { users: { _id } } }).exec();
    if (!updatedSchool) {
        throw new Error('Could not update the School' + updatedSchool);
    }
    return updatedSchool;
};


export const schoolsResolvers = {
    Query: {
        getAllSchools,
        getSchool
    },
    Mutation: {
        updateSchool,
        insertMember,
    },
    School: {
        async pythagoras (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('pythagoras').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.users;
        },
        async euclid (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('euclid').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.users;
        },
        async aristotle (root) {
            console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('aristotle').execPopulate();
            console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.users;
        }
    }
};
