const express = require('express');
const graphqlHTTP = require('express-graphql')
const app = express();

const port = 4000;
app.use('/graphql', graphqlHTTP({
    schema: MyGraphQLSchema,
    graphiql: true
}))
app.listen(port, () => console.log(`Server is running at port ${port}`));