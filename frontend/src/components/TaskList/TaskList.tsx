import { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../store/services/taskService";
import { ETaskStatuses } from "../../enums/ETaskStatuses";
import ITask from "../../interfaces/ITask";
import Modal from "../UI/Modal/Modal";
import AddTaskForm from "../AddTaskForm/AddTaskForm";


const TaskList: FC = (): ReactElement => {
    const {data} = useGetTasksQuery("");
    const [deleteTask] = useDeleteTaskMutation();
    const [updateTask] = useUpdateTaskMutation();

    const [filter, setFilter] = useState("ALL")
    const [tasks, setTasks] = useState<ITask[]>([])
    const [showAddingPanel, setShowAddingPanel] = useState(false)
    const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>, obj: ITask) => {
        updateTask({id: obj._id, data: {status: e.target.value as ETaskStatuses}})
    }

    const filterTasks = () => {
        if (data && filter !== "ALL") {
            const filteredData = data.filter(task => task.status === filter)
            setTasks(filteredData)
            return
        } 
        data && setTasks(data)
    }

    useEffect(() => {
        filterTasks()
    }, [data, filter])

    const closeAddModal = () => {
        setShowAddingPanel(false)
    }
    return (
        <>
            <Modal show={showAddingPanel} closed={closeAddModal} >
                <AddTaskForm />
            </Modal>
            <div className={styles.top}>
                <select className={styles.filter} value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="ALL">ALL</option>
                    <option value="TODO">TODO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETE">COMPLETE</option>
                </select>
                <button 
                    onClick={() => setShowAddingPanel(true)}
                    className={styles.addButton}>Add new task</button>
            </div>
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
                            return <tr key={task._id}>
                                        <td>{i+1}</td>
                                        <td>{task.title}</td>
                                        <td>
                                            <select value={task.status} onChange={(e) => onChangeHandler(e, task)}>
                                                <option className={styles.firstOption}>{task.status}</option>
                                                {
                                                    Object.values(ETaskStatuses).filter((status) => status !== task.status).map(status => {
                                                        return <option key={status} value={status}>{status}</option>
                                                    })
                                                }
                                            </select>
                                        </td>
                                        <td>
                                            <div className={styles.actionButtons}>
                                                <button>
                                                Edit
                                            </button>
                                            <button onClick={() => deleteTask(task._id)}>
                                                Remove
                                            </button>
                                            </div>
                                        </td>
                                    </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>
        
    )
}

export default TaskList