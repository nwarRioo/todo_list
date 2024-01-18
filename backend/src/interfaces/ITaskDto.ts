import { ETaskStatuses } from "../../../backend/src/enums/ETaskStatuses"

export default interface ITaskDto {
    title: string
    description?: string
    status: ETaskStatuses
}