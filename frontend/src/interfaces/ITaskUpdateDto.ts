import { ETaskStatuses } from "../../../backend/src/enums/ETaskStatuses"

export default interface ITaskUpdateDto {
    title?: string
    description?: string
    status?: ETaskStatuses
}