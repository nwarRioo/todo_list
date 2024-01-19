import { ChangeEvent, FC, ReactElement } from "react";
import styles from "./TaskList.module.css";
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../store/services/taskService";
import { ETaskStatuses } from "../../enums/ETaskStatuses";
import ITask from "../../interfaces/ITask";


const TaskList: FC = (): ReactElement => {
    const {data: tasks} = useGetTasksQuery("");
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();
    
 const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>, obj: ITask) => {
    updateTask({id: obj._id, data: {status: e.target.value as ETaskStatuses}})
 }
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr >
                        <th>#</th>
                        <th>Tasks</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map((task, i) => {
                        return <tr >
                                    <td>{i+1}</td>
                                    <td>{task.title}</td>
                                    <td>
                                        <select value={task.status} onChange={(e) => onChangeHandler(e, task)}>
                                            <option className={styles.firstOption}>{task.status}</option>
                                            {
                                                Object.values(ETaskStatuses).filter((status) => status !== task.status).map(status => {
                                                    return <option value={status}>{status}</option>
                                                })
                                            }
                                        </select>
                                    </td>
                                    <td className={styles.actionButtons}>
                                        <button>
                                            Edit
                                        </button>
                                        <button onClick={() => deleteTask(task._id)}>
                                            Remove
                                        </button>
                                    </td>
                                </tr>
                    })}
                    
                </tbody>
            </table>
        </div>
        
    )
}

export default TaskList