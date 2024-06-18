import { UpdateCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayProxyEventV2 } from "aws-lambda";
import { dynamoClient } from "../lib/dynamoClient";

export async function handler(event: APIGatewayProxyEventV2) {
  const { productId } = event.pathParameters;
  const body = JSON.parse(event.body ?? '{}');

  const command = new UpdateCommand({
    TableName: 'ProductsTable',
    Key: { id: productId },
    UpdateExpression: 'SET #name = :name, #price = :price, #tags = :tags',
    ExpressionAttributeNames: {
      '#name': 'name',
      '#price': 'price',
      '#tags': 'tags',
    },
    ExpressionAttributeValues: {
      ':name': body.name,
      ':price': body.price,
      ':tags': body.tags,
    },
    ReturnValues: 'ALL_NEW',
  });

  await dynamoClient.send(command);

  return {
    statusCode: 200,
    body: 'updateProduct',
  };
}
