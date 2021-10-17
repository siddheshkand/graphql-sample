const graphql = require('graphql');
var _ = require('lodash');

var usersData = [
    { id: '1', name: 'Bond', age: 36, profession: 'Programmer' },
    { id: '13', name: 'Anna', age: 26, profession: 'Baker' },
    { id: '211', name: 'Bella', age: 16, profession: 'Mechanic' },
    { id: '19', name: 'Gina', age: 26, profession: 'Painter' },
    { id: '150', name: 'Georgina', age: 36, profession: 'Teacher' }
];

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
                return _.find(usersData, { id: args.id })
            },
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})