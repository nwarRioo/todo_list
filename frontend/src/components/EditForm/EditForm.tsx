import React, { FC, ReactElement, useEffect, useState } from "react";
import styles from "./EditForm.module.css";
import { useUpdateTaskMutation } from "../../store/services/taskService";
import errorHandler from "../../helpers/errorHandler";
import successHandler from "../../helpers/successHandler";
import ITaskUpdateDto from "../../interfaces/ITaskUpdateDto";

interface IEditFormProps {
    modalCloser: () => void
    id: string
    data: ITaskUpdateDto
}

const EditForm: FC<IEditFormProps> = ({modalCloser, data, id}): ReactElement => {
    const [task, setTask] = useState<ITaskUpdateDto>({
        title: "",
        description: ""
    })

    const [count, setCount] = useState(0);

    useEffect(() => {
        setTask(data)
        setCount(data.description!.length)
    }, [data])
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

    const [updateTask, {isError, isSuccess, error}] = useUpdateTaskMutation();
    successHandler(isSuccess, "Задача изменена!")
    errorHandler(isError, error);

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.title.trim() === '') {
            setTitleFieldErrorMessage("Title is required!");
            return;
        }
        updateTask({id: id, data: task});
        setTask({
            title: "",
            description: ""
        });
        setTitleFieldErrorMessage("");
        modalCloser();
    }

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>Edit task</h2>
            <div className={styles.formTop}>
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
            <button>SAVE</button>
        </form>
    )
}

export default EditForm;