import AWS from 'aws-sdk';
import express, { Request, Response } from 'express';
import { createServer } from 'http';
import 'reflect-metadata';
import { IRequestSubmissionEntity } from './entities/RequestSubmissionEntity';
import RequestSubmissionService from './services/request-submission';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const cors = require('cors');

AWS.config.credentials = new AWS.SharedIniFileCredentials();
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' });

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));


app.post('/submit', async (req: Request<never, never, IRequestSubmissionEntity>, res: Response) => {
  try {
    const request = req.body;
    const isValid = await RequestSubmissionService.schema.isValid(request);
    if (!isValid) {
      throw Error('Invalid request details');
    }

    const submittedRequest = await RequestSubmissionService.addNewRequestSubmission(request);

    res.status(200);
    res.json(submittedRequest);
  } catch(e: any) {
    res.status(400);
    res.json({ error: e.message });
  }
});

const server = createServer(app);

server.listen(8081);

export default docClient;