const prepareNormalResponse = (message: any) => {
    return {
        success: true,
        message
    }
}

function prepareSuccessResponse(data: any, message: any) {
    return {
        success: true,
        data,
        message,
        totalRecords: data.length
    }
}

function prepareErrorResponse(message: any) {
    return {
        success: false,
        message
    }
}

export {
    prepareNormalResponse,
    prepareSuccessResponse,
    prepareErrorResponse
}
