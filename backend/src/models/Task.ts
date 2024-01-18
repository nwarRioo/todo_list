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
        default: ETaskStatuses.TODO,
        enum: ETaskStatuses,
        required: true
    }
}, {
    versionKey: false
});

TaskSchema.pre<ITask>('save', function (next) {
    this.status = ETaskStatuses.TODO;
    next();
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);