import React, { FC, ReactElement, useState } from "react";
import styles from "./AddTaskForm.module.css";
import ITaskCreateDto from "../../interfaces/ITaskCreateDto";
import { useAddTaskMutation } from "../../store/services/taskService";


const AddTaskForm: FC = (): ReactElement => {
    const [task, setTask] = useState<ITaskCreateDto>({
        title: "",
        description: ""
    })

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTask(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value,
            }
        });
    };

    const textareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setTask(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value,
            }
        });
    };

    const [addTask] = useAddTaskMutation();

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        addTask(task)
    }

    return (
        <form className={styles.addTaskForm} onSubmit={submitHandler}>
            <h2>New task</h2>
            <input 
                name="title"
                onChange={inputHandler}
                value={task.title}
                className={styles.title} type="text" />
            <textarea 
                className={styles.description}
                onChange={textareaHandler}
                value={task.description}
                name="description"
            />
            <button>ADD</button>
        </form>
    )
}

export default AddTaskForm