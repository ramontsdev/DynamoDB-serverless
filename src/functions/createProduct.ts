import {
  PutCommand
} from '@aws-sdk/lib-dynamodb';
import type { APIGatewayProxyEventV2 } from 'aws-lambda';
import { randomUUID } from 'node:crypto';
import { dynamoClient } from '../lib/dynamoClient';

export async function handler(event: APIGatewayProxyEventV2) {
  const body = JSON.parse(event.body ?? '{}');

  const command = new PutCommand({
    TableName: 'ProductsTable',
    Item: {
      id: randomUUID(),
      name: body.name,
      price: body.price,
      tags: body.tags,
    }
  });

  const response = await dynamoClient.send(command);

  return {
    statusCode: 201,
    body: JSON.stringify(response),
  };
}
