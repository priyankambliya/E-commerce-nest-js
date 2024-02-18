export const throwError = (response: any, message: string, statusCode?: number) => {
    return response.status(statusCode).send({ message })
}