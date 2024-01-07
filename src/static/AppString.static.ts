import { HttpStatus } from "@nestjs/common";

export const ALL_STATUS_CODES = {

    // ALL SUCCESS STATUS: 
    SUCCESS_CODES:{
        OK:HttpStatus.OK,
        CONTINUE:HttpStatus.CONTINUE,
        CREATED:HttpStatus.CREATED,
        FOUND:HttpStatus.FOUND,
    },
    
    // ALL ERROR STATUS: 
    ERROR_CODES:{
        NOT_ACCEPTABLE:HttpStatus.NOT_ACCEPTABLE,
        CONFLICT:HttpStatus.CONFLICT,
        NOT_FOUND:HttpStatus.NOT_FOUND
    }
    
}