const graphql = require('graphql');
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;
const _ = require('lodash');

const books = [
    { name: 'Name of the Wind', genere: 'Fantasy', id: '1', authorid: '1' },
    { name: 'Game of Thrones', genere: 'Fantasy', id: '2', authorid: '2' },
    { name: 'Altered Carbon', genere: 'Sci-Fi', id: '3', authorid: '3' }
]
const authors = [
    { id: '1', name: 'Laxmi Prasad Devkota', age: '117', country: 'Nepal' },
    { id: '2', name: 'Fake Name', age: '45', country: 'Malaysia' },
    { id: '3', name: 'Another FakeName', age: '75', country: 'Austrilia' }
]

const BookType = new GraphQLObjectType({
    name: 'Books',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genere: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                console.log(parent);
                return _.find(authors, { id: parent.authorid })
            }
        }
    })

});

const AuthorType = new GraphQLObjectType({
    name: 'Authors',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        country: { type: GraphQLString },
        age: { type: GraphQLInt }
    })

});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: () => ({
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(books, { id: args.id });
            }
        },
        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return _.find(authors, { id: args.id });
            }

        }
    })
});

module.exports = new GraphQLSchema({
    query: RootQuery
});