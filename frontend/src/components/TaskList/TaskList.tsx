import { FC, ReactElement } from "react";
import styles from "./TaskList.module.css";
import { useDeleteTaskMutation, useGetTasksQuery } from "../../store/services/taskService";


const TaskList: FC = (): ReactElement => {
    const {data: tasks} = useGetTasksQuery("");
    const [deleteTask] = useDeleteTaskMutation();
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.table}>
                <thead>
                    <tr >
                        <th>#</th>
                        <th>Задачи</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks && tasks.map((task, i) => {
                        return <tr >
                                    <td>{i+1}</td>
                                    <td>{task.title}</td>
                                    <td>{task.status}</td>
                                    <td className={styles.actionButtons}>
                                        <button>
                                            Изменить
                                        </button>
                                        <button onClick={() => deleteTask(task._id)}>
                                            Удалить
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