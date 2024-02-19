const fs = require('fs')

// FUNCTION FOR HANDLE ERROR:
export const throwError = (response: any, message: string, statusCode?: number) => {
    return response.status(statusCode).send({ message })
}

// FUNCTION FOR CREATE DIRECTORY:
export const createDirectoryIfNotExists = (directoryPath: any) => {
    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }
};