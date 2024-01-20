import { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import styles from "./TaskList.module.css";
import { useDeleteTaskMutation, useGetTasksQuery, useUpdateTaskMutation } from "../../store/services/taskService";
import { ETaskStatuses } from "../../enums/ETaskStatuses";
import ITask from "../../interfaces/ITask";
import Modal from "../UI/Modal/Modal";
import AddTaskForm from "../Forms/AddForm";
import successHandler from "../../helpers/successHandler";
import errorHandler from "../../helpers/errorHandler";
import FullTask from "./FullTask/FullTask";
import EditForm from "../Forms/EditForm";

const initialStateFullTask = {
    title: "",
    description: "",
    datetime: ""
}

const intialStateEditTask = {
    id: "",
    title: "",
    description: ""
}


const TaskList: FC = (): ReactElement => {
    const [fullTask, setFullTask] = useState(initialStateFullTask)
    const [editTask, setEditTask] = useState(intialStateEditTask)

    const {data, isError, error} = useGetTasksQuery("");
    errorHandler(isError, error);
    
    const [deleteTask, 
        {   
            isError: isErrorRemoveTask, 
            isSuccess: isSuccesRemoveTask, 
            error: errorRemoveTask}] = useDeleteTaskMutation();

    successHandler(isSuccesRemoveTask, "Задача удалена!");
    errorHandler(isErrorRemoveTask, errorRemoveTask);      

    const [updateTask, 
        {
            isError: isErrorUpdateTask, 
            isSuccess: isSuccesUpdateTask, 
            error: errorUpdateTask}] = useUpdateTaskMutation();
    successHandler(isSuccesUpdateTask, "Статус задачи измненен!");
    errorHandler(isErrorUpdateTask, errorUpdateTask)


    const [editModal, setEditModal] = useState(false);

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

    const [isFullTask, setIsFulltask] = useState(false)

    const showFullTask = (title: string, description: string, datetime: string) => {
        setFullTask({title: title, description: description, datetime})
        setIsFulltask(true)
    }

    const closeFullTask = () => {
        setIsFulltask(false)
        setFullTask(initialStateFullTask)
    }

    const showEditModal = (id: string, title: string, description: string) => {
        setEditTask({id, title, description});
        setEditModal(true)
    }

    const closeEditModal = () => {
        setEditModal(false)
        setEditTask(intialStateEditTask)
    }

    return (
        <>
            <Modal show={showAddingPanel} closed={closeAddModal} >
                <AddTaskForm modalCloser={closeAddModal}/>
            </Modal>
            <Modal show={editModal} closed={closeEditModal}>
                <EditForm modalCloser={closeEditModal} data={{title: editTask.title, description: editTask.description}} id={editTask.id} />
            </Modal>
            <Modal show={isFullTask} closed={closeFullTask}>
                <FullTask title={fullTask.title} description={fullTask.description} datetime={fullTask.datetime}/>
            </Modal>
            <div className={styles.top}>
                <select className={styles.filter} value={filter} onChange={(e) => setFilter(e.target.value)}>
                    <option value="ALL">ALL</option>
                    <option value="TODO">TODO</option>
                    <option value="IN PROGRESS">IN PROGRESS</option>
                    <option value="COMPLETE">COMPLETE</option>
                </select>
                <h1 className={styles.appTitle}>Todo List</h1>
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
                        {tasks && tasks.length ? tasks.map((task, i) => {
                            return <tr key={task._id}>
                                        <td>{i+1}</td>
                                        <td className={styles.taskTitle} onClick={() => showFullTask(task.title, task.description!, String(task.datetime))}>{task.title}</td>
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
                                                <button onClick={() => showEditModal(task._id, task.title, task.description!)}>
                                                    Edit
                                                </button>
                                                <button onClick={() => deleteTask(task._id)}>
                                                    Remove
                                                </button>
                                                
                                            </div>
                                        </td>
                                    </tr>
                        }) : <tr style={{color: "white"}}><td colSpan={4}>No tasks yet... CLick button to add</td></tr>}
                    </tbody>
                </table>
            </div>
        </>
        
    )
}

export default TaskList