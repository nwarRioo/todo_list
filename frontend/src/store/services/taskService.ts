import { IMessage } from "../../interfaces/IMessage";
import ITask from "../../interfaces/ITask";
import ITaskCreateDto from "../../interfaces/ITaskCreateDto";
import ITaskUpdateDto from "../../interfaces/ITaskUpdateDto";
import { api } from "./api";


const taskAPI = api.injectEndpoints({
    endpoints: (build) => ({
        getTasks: build.query<ITask[], string>({
            query: () => ({
                url: "/tasks",
                method: "GET"
            }),
            providesTags: ["Task"]
        }),
        addTask: build.mutation<ITask, ITaskCreateDto>({
            query: (task: ITaskCreateDto) => ({
                url: "/tasks",
                method: "POST",
                body: task
            }),
            invalidatesTags: ["Task"]
        }),
        deleteTask: build.mutation<IMessage, string>({
            query: (id: string) => ({
                url: `/tasks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Task"]
        }),
        updateTask: build.mutation<ITask, { id: string, data: ITaskUpdateDto }>({
            query: ({id, data}) => ({
                url: `/tasks/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: ["Task"]
        })
    })
})

export const {
    useGetTasksQuery,
    useDeleteTaskMutation,
    useUpdateTaskMutation,
    useAddTaskMutation
} = taskAPI;