/*
|--------------------------------------------------------------------------
| Http Exception Handler
|--------------------------------------------------------------------------
|
| AdonisJs will forward all exceptions occurred during an HTTP request to
| the following class. You can learn more about exception handling by
| reading docs.
|
| The exception handler extends a base `HttpExceptionHandler` which is not
| mandatory, however it can do lot of heavy lifting to handle the errors
| properly.
|
*/

import Logger from '@ioc:Adonis/Core/Logger';
import HttpExceptionHandler from '@ioc:Adonis/Core/HttpExceptionHandler';
import { returnResponse } from 'returnResponse';

export default class ExceptionHandler extends HttpExceptionHandler {
    constructor() {
        super(Logger);
    }

    public handle(error, { response }) {
        if (error.code === 'E_ROW_NOT_FOUND') {
            return returnResponse(response, 'Record not found', 404);
        } else if (
            [
                'ER_BAD_FIELD_ERROR',
                'E_MISSING_DATABASE_ROW',
                'E_INVALID_DATABASE_QUERY',
                'E_MISSING_DB_CONNECTION',
            ].includes(error.code)
        ) {
            return returnResponse(response, 'Server error', 500);
        } else if (error.code === 'E_UNAUTHORIZED_ACCESS') {
            return returnResponse(response, 'Unauthorized access', 401);
        } else if (error.code === 'E_VALIDATION_FAILURE') {
            return returnResponse(
                response,
                error.messages.errors[0].message,
                422,
                [],
                error.messages.errors
            );
        } else if (error.code === undefined) {
            return returnResponse(response, error.message, 422);
        } else if (error.code === 'E_TOO_MANY_REQUESTS') {
            return returnResponse(response, 'Too many requests', 429);
        } else if (error.code === 'E_REQUEST_ENTITY_TOO_LARGE') {
            return returnResponse(response, 'Request entity too large', 413);
        } else {
            return returnResponse(response, error.message, 422);
        }
    }
}
