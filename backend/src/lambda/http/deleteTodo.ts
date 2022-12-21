import 'source-map-support/register'
import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda';
import {deleteToDo} from "../../businessLogic/ToDo";



// hàm được gọi trực tiếp qua http
// function enherit from ToDo.ts. before using deleteToDo I extract jwtToken from authorization to get userID
// function call -> businessLogic/ToDo.ts -> dataLayer/todoAccess.ts
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("Processing Event ", event);
    const authorization = event.headers.Authorization;
    const split = authorization.split(' ');
    const jwtToken = split[1];
    const todoId = event.pathParameters.todoId;
    const deleteData = await deleteToDo(todoId, jwtToken);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: deleteData,
    }
};
