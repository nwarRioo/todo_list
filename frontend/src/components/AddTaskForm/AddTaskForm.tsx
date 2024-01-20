import React, { FC, ReactElement, useState } from "react";
import styles from "./AddTaskForm.module.css";
import ITaskCreateDto from "../../interfaces/ITaskCreateDto";
import { useAddTaskMutation } from "../../store/services/taskService";
import errorHandler from "../../helpers/errorHandler";
import successHandler from "../../helpers/successHandler";

interface IAddTaskFormProps {
    modalCloser: () => void
}
const AddTaskForm: FC<IAddTaskFormProps> = ({modalCloser}): ReactElement => {
    const [task, setTask] = useState<ITaskCreateDto>({
        title: "",
        description: ""
    })

    const [count, setCount] = useState(0);
    const [titleFieldErrorMessage, setTitleFieldErrorMessage] = useState<string>('');

    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTask(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value,
            }
        });
    };

    const textareaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setCount(e.target.value.length)
        setTask(prevState => {
            return {
                ...prevState, [e.target.name]: e.target.value,
            }
        });
    };

    const [addTask, {isError, isSuccess, error}] = useAddTaskMutation();
    successHandler(isSuccess, "Новая задача добавлена!")
    errorHandler(isError, error);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.title.trim() === '') {
            setTitleFieldErrorMessage("Title is required!");
            return;
        }
        addTask(task);
        setTask({
            title: "",
            description: ""
        });
        setTitleFieldErrorMessage("");
        modalCloser();
    }

    return (
        <form className={styles.addTaskForm} onSubmit={submitHandler}>
            <h2>New task</h2>
            <div className={styles.addFormTop}>
                <p>Title: <span className={styles.requiredSymbol}>*</span></p>
                <input 
                    maxLength={40}
                    required
                    name="title"
                    onChange={inputHandler}
                    value={task.title}
                    className={styles.title} type="text" />
                    <p className='LoginPage-error-text'>{titleFieldErrorMessage}</p>
            </div>
            <textarea 
                placeholder="Description"
                maxLength={250}
                className={styles.description}
                onChange={textareaHandler}
                value={task.description}
                name="description"
            />
            <p>{count}/250</p>
            <button>ADD</button>
        </form>
    )
}

export default AddTaskForm