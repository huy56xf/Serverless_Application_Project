import { getTodos } from '../../businessLogic/ToDo';
import { getUserId } from '../utils';

import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
  {
    const userId: string = getUserId(event);
    const items = await getTodos(userId);
    return {
      statusCode: 200,
      body: JSON.stringify({
        items
      })
    }
  }
)

handler
  .use(httpErrorHandler())
  .use(
    cors(
      {
        origin: "*",
        credentials: true,
      }
    )
  )