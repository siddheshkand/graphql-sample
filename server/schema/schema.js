const graphql = require('graphql');
var _ = require('lodash');

var usersData = [
    { id: '1', name: 'Bond', age: 36, profession: 'Programmer' },
    { id: '13', name: 'Anna', age: 26, profession: 'Baker' },
    { id: '211', name: 'Bella', age: 16, profession: 'Mechanic' },
    { id: '19', name: 'Gina', age: 26, profession: 'Painter' },
    { id: '150', name: 'Georgina', age: 36, profession: 'Teacher' }
];

var hobbiesData = [
    { id: '1', title: 'Programming', description: 'Using computers to make the world a better place', userId: '150' },
    { id: '2', title: 'Rowing', description: 'Sweat and feel better before eating donouts', userId: '211' },
    { id: '3', title: 'Swimming', description: 'Get in the water and learn to become the water', userId: '211' },
    { id: '4', title: 'Fencing', description: 'A hobby for fency people', userId: '13' },
    { id: '5', title: 'Hiking', description: 'Wear hiking boots and explore the world', userId: '150' },
];

// var postsData = [
//     {id: '1', comment: 'Building a Mind', userId: '1'},
//     {id: '2', comment: 'GraphQL is Amazing', userId: '1'},
//     {id: '3', comment: 'How to Change the World', userId: '19'},
//     {id: '4', comment: 'How to Change the World', userId: '211'},
//     {id: '5', comment: 'How to Change the World', userId: '1'}
// ]

// Create Type
const UserType = new graphql.GraphQLObjectType({
    name: 'User',
    description: 'Documentation for user',
    fields: () => {
        return {
            id: { type: graphql.GraphQLString },
            name: { type: graphql.GraphQLString },
            age: { type: graphql.GraphQLInt },
        }
    }
})

const HobbyType = new graphql.GraphQLObjectType({
    name: "Hobby",
    description: "Hobby Description",
    fields: () => ({
        id: { type: graphql.GraphQLString },
        title: { type: graphql.GraphQLString },
        description: { type: graphql.GraphQLString },
    })
});

// Root Query
const RootQuery = new graphql.GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Description',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: graphql.GraphQLString } },
            resolve(parent, args) {
                // return data from data source
                if(args.id){
                    return _.find(usersData, { id: args.id })
                }else {
                    return usersData;
                }
            },
        },
        hobby: {
            type: HobbyType,
            args: { id: { type: graphql.GraphQLID } },
            resolve(parent, args) {
                return _.find(hobbiesData, { id: args.id })
            }
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})