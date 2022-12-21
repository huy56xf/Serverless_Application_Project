import { createTodo } from '../../businessLogic/ToDo';
import { getUserId } from '../utils'
import { createLogger } from '../../utils/logger';
import 'source-map-support/register';
import * as middy from 'middy';
import { cors, httpErrorHandler } from 'middy/middlewares';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';

const logger = createLogger('TodosAccess')

export const handler = middy(
  async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => 
  {
    const newTodo: CreateTodoRequest = JSON.parse(event.body);
    const userId: string = getUserId(event);
    logger.info('Starting create new todo!');    
    const todo = await createTodo(newTodo, userId);
    return {
      statusCode: 201,
      body: JSON.stringify({
        item: todo
      })
    }
  });


handler
  .use(httpErrorHandler())
  .use(
    cors({
      credentials: true
    })
  )