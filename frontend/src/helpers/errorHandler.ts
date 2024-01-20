import { SerializedError } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {useEffect} from "react";
import { IMessage } from "../interfaces/IMessage";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { IErrorResponse } from "../interfaces/IErrorResponse";

const errorHandler = (isError: boolean, data: FetchBaseQueryError | SerializedError | undefined) => {
    const err = data as IErrorResponse<IMessage>;
    return useEffect(() => {
        isError && toast.error(`Ошибка ${err.data.message}`);
    }, [isError]);
};

export default errorHandler;