import mongoose, { Mongoose } from "mongoose";
import ITask from "../interfaces/ITask";
import IResponse from "../interfaces/IResponse";
import IError from "../interfaces/IError";
import { Task } from "../models/Task";
import { StatusCodes } from "http-status-codes";
import errorHandler from "../helpers/errorHandler";
import ITaskDto from "../interfaces/ITaskDto";


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
        } catch (err) {return errorHandler(err)};
        
    };

    public addTask = async (task: ITaskDto): Promise<IResponse<ITask | IError>> => {
        try {
            const newTask = await new Task(task).save();
            return {
                status: StatusCodes.CREATED,
                result: newTask,
            };
        } catch (err) {return errorHandler(err)};
    };

    public deleteTaskById = async (id: string): Promise<IResponse<string | IError>> => {
        try {
            const isDeleted = await Task.findOneAndDelete({ _id: id });
            if (!isDeleted) throw new Error("Task not found");
            return {
                status: StatusCodes.OK,
                result: "Task is deleted",
            };
        } catch (err) {return errorHandler(err)};
    };

    public updateTaskById = async (id: string, newData: ITaskDto): Promise<IResponse<ITask | IError>> => {
        try {
            const updatedTask = await Task.findOneAndUpdate({_id: id}, {$set: newData}, {new: true, runValidators: true });
            if(!updatedTask) throw new Error("Task not found");
            return {
                status: StatusCodes.OK,
                result: updatedTask,
            };
        } catch (err) {return errorHandler(err)};
    };
}

export const mongoDB = new MongoDB();