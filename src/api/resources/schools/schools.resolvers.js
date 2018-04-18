import School from './schools.model';
import Player from "../player/player.model";

const getAllSchools = async () => await School.find({}).exec();

const getSchool = async (_, { schoolName }) => await School.find({}).select(schoolName);

const updateNewPlayer = async (_, {_id, user_id}) => {
    const updatedPlayer = await School.findByIdAndUpdate(_id, { $push: { pythagoras: user_id } }).exec();
    return updatedPlayer;
};

const newRankedPlayer = async (_, { user_id }) =>{
    const data = await School.create({ pythagoras: user_id });
    return data;
};

export const schoolsResolvers = {
    Query: {
        getAllSchools,
        getSchool
    },
    Mutation: {
        newRankedPlayer,
        updateNewPlayer
    },
    School: {
        async pythagoras (root) {
            // console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('pythagoras').execPopulate();
            // console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.pythagoras;
        },
        async euclid (root) {
            // console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('euclid').execPopulate();
            // console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.euclid;
        },
        async aristotle (root) {
            // console.log('ROOT QUERY DOCUMENT ====> ' + root);
            const populatedQuery =  await root.populate('aristotle').execPopulate();
            // console.log('CLAN USERS QUERY POP RESULT =====> ' + populatedQuery);
            return populatedQuery.aristotle;
        }
    }
};
