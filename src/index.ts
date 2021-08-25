import AWS from 'aws-sdk';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import AccountResolver from './resolvers/account';
import UserResolver from './resolvers/user';

AWS.config.credentials = new AWS.SharedIniFileCredentials({ profile: 'worldwideandweb' });
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });
async function bootstrap() {
  
  const app = express();
  
  const schema = await buildSchema({
    resolvers: [UserResolver, AccountResolver],
    // automatically create `schema.gql` file with schema definition in current folder
    emitSchemaFile: path.resolve(__dirname, "schema.gql"),
  });

  app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true,
  }));
  
  app.listen(8080);
}  

bootstrap();

export default docClient;