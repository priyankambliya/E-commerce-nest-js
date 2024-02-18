import { prepareErrorResponse } from "./responseHandler"

// const errorHandler = (error: any, req: any, res: any, next: Function) => {
//     const status = error.statusCode || 500
//     const message = error.message
//     return res.status(status).json(prepareErrorResponse(message))
// }

const uncaughtException = (error: any, origin: any) => {
    console.log("----- Uncaught exception -----")
    console.log(error)
    console.log("----- Exception origin -----")
    console.log(origin)
}

const unhandledRejection = (reason: any, promise: any) => {
    console.log("----- Unhandled Rejection at -----")
    console.log(promise)
    console.log("----- Reason -----")
    console.log(reason)
}

export { uncaughtException, unhandledRejection }
