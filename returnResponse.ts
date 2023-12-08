/************************/
/*
@param response is response contact.
@param status indicates status code.
*/
/************************/
export function returnResponse(
    response,
    message: string,
    status: number = 200,
    data = {},
    errors: Array<any> | null = null
) {
    let isSuccess = true;
    if (![200, 201, 202, 203].includes(status)) {
        isSuccess = false;
    }

    return response.status(status).json({
        is_success: isSuccess,
        status: status,
        message: message,
        data: data,
        errors: errors,
    });
}

// Export the specific function you want to import in other files
module.exports = {
   returnResponse
};
