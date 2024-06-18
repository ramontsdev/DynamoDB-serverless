import { ScanCommand } from "@aws-sdk/lib-dynamodb";
import { dynamoClient } from "../lib/dynamoClient";

export async function handler() {
  const command = new ScanCommand({
    TableName: "ProductsTable",
  });

  const { Items: products } = await dynamoClient.send(command);

  return {
    statusCode: 200,
    body: JSON.stringify(products),
  };
}
