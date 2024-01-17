import { StatusCodes } from "http-status-codes";
import IError from "../interfaces/IError";
import IResponse from "../interfaces/IResponse";

const errorHandler = (err: any): IResponse<IError> => {
    const error = err as Error;
    return {
        status: StatusCodes.BAD_REQUEST,
        result: {
            status: "error",
            message: error.message
        }
    };
}

export default errorHandler;