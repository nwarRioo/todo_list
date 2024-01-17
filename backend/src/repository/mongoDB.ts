import mongoose, { Mongoose } from "mongoose";
import ITask from "../interfaces/ITask";
import IResponse from "../interfaces/IResponse";
import IError from "../interfaces/IError";
import { Task } from "../models/Task";
import { StatusCodes } from "http-status-codes";
import ITaskCreateDto from "../interfaces/ITaskCreateDto";


export class MongoDB {
    private client: Mongoose | null = null;
    public init = async () => {
        this.client = await mongoose.connect(process.env.MONGO_CLIENT_URL!);
        console.log("MongoDB is connected")
    }
    public close = async (): Promise<void> => {
        if (!this.client) return;
        await this.client.disconnect();
    };

    public getTasks = async (): Promise<IResponse<ITask[] | IError>> => {
        try {
            const tasks = await Task.find();
            return {
                status: StatusCodes.OK,
                result: tasks
            };
        } catch (err: unknown) {
            const error = err as Error;
            return {
                status: StatusCodes.BAD_REQUEST,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        }
    };

    public addTask = async (task: ITaskCreateDto): Promise<IResponse<ITask | IError>> => {
        try {
            console.log("VOT: " + task)
            const newTask = await new Task(task).save();
            return {
                status: StatusCodes.CREATED,
                result: newTask,
            };
        } catch (err: unknown) {
            const error = err as Error;
            return {
                status: StatusCodes.BAD_REQUEST,
                result: {
                    status: "error",
                    message: error.message
                }
            };
        };
    };
}

export const mongoDB = new MongoDB();