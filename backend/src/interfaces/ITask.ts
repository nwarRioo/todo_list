import { ObjectId } from "mongoose"
import { ETaskStatuses } from "../enums/ETaskStatuses"

export default interface ITask {
    _id: ObjectId
    title: string
    description?: string
    datetime: Date
    status: ETaskStatuses
}