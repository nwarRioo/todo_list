import { ObjectId } from "mongoose";
import { ETaskStatuses } from "../../../backend/src/enums/ETaskStatuses"

export default interface ITask {
    _id: ObjectId
    title: string
    description?: string
    datetime: Date
    status: ETaskStatuses
}