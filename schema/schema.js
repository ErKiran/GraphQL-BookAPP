const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;
const _ = require('lodash');

const books = [
    { name: 'Name of the Wind', genere: 'Fantasy', id: '1' },
    { name: 'Game of Thrones', genere: 'Fantasy', id: '2' },
    { name: 'Altered Carbon', genere: 'Sci-Fi', id: '3' }
]

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLString },
        name: { type: GraphQLString },
        genere: { type: GraphQLString }
    })

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLString } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});