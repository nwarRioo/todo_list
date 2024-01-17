import { ETaskStatuses } from "../enums/ETaskStatuses"

export default interface ITaskDto {
    title: string
    description?: string
    status: ETaskStatuses
}