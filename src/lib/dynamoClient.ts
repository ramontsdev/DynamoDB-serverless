import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// export const client = new DynamoDBClient({
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
//   region: process.env.AWS_REGION,
// });

const client = new DynamoDBClient();
export const dynamoClient = DynamoDBDocumentClient.from(client);
