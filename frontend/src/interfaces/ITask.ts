import { ETaskStatuses } from "../../../backend/src/enums/ETaskStatuses"

export default interface ITask {
    _id: string
    title: string
    description?: string
    datetime: Date
    status: ETaskStatuses
}