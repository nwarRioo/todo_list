import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";
import { ETaskStatuses } from "../enums/ETaskStatuses";


const TaskSchema: Schema = new Schema<ITask>({
    title: {
        type: String,
        required: true
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: String,
    status: {
        type: String,
        default: ETaskStatuses.TODO
    }
}, {
    versionKey: false
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);