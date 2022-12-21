import { updateTodo } from '../../businessLogic/ToDo'
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest'
import { createLogger } from '../../utils/logger'
import { getUserId } from '../utils' 
import 'source-map-support/register'
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import * as middy from 'middy'
import { cors, httpErrorHandler } from 'middy/middlewares'

const logger = createLogger('UPDATE TODO')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
  {
    logger.info('UPDATING TODO', event);
    const todoId = event.pathParameters.todoId;
    const userId: string = getUserId(event);
    const updatedTodo: UpdateTodoRequest = JSON.parse(event.body);
    logger.info('UPPDATED TODO', updatedTodo)
    const updatedItem = await updateTodo(userId, todoId, updatedTodo);
    return {
      statusCode: 200,
      body: JSON.stringify({
        item: updatedItem
      })
    }
  }
)


handler
  .use(httpErrorHandler())
  .use(cors(
    {
      origin: "*",
      credentials: true,
    }
  ))