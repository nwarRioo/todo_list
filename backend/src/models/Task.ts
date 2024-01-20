import mongoose, { Schema } from "mongoose";
import ITask from "../interfaces/ITask";
import { ETaskStatuses } from "../enums/ETaskStatuses";


const TaskSchema: Schema = new Schema<ITask>({
    title: {
        type: String,
        required: true,
        maxlength: 40
    },
    datetime: {
        type: Date,
        required: true,
        default: Date.now
    },
    description: {
        type: String,
        maxlength: 250
    },
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
    if(this.title.trim() === '') throw new Error("Title is required")
    this.status = ETaskStatuses.TODO;
    next();
});

export const Task = mongoose.model<ITask>('Task', TaskSchema);