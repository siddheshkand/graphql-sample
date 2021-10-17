const graphql = require('graphql');

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
            },
        }
    }
})

module.exports = new graphql.GraphQLSchema({
    query: RootQuery
})