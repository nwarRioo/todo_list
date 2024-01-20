import React, { ChangeEvent, FC, ReactElement, useEffect, useState } from "react";
import styles from "./Forms.module.css";
import { useUpdateTaskMutation } from "../../store/services/taskService";
import errorHandler from "../../helpers/errorHandler";
import successHandler from "../../helpers/successHandler";
import ITaskUpdateDto from "../../interfaces/ITaskDto";
import ITaskDto from "../../interfaces/ITaskDto";

interface IEditFormProps {
    modalCloser: () => void
    id: string
    data: ITaskUpdateDto
}

const initialTaskState: ITaskDto = {
    title: "",
    description: ""
}

const EditForm: FC<IEditFormProps> = ({modalCloser, data, id}): ReactElement => {
    const [task, setTask] = useState(initialTaskState)
    const [lettersCount, setLettersCount] = useState(0);
    const [titleFieldErrorMessage, setTitleFieldErrorMessage] = useState<string>("");
    const [updateTask, {isError, isSuccess, error}] = useUpdateTaskMutation();

    useEffect(() => {
        setTask(data)
        setLettersCount(data.description!.length)
    }, [data])

    const formFieldsHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitleFieldErrorMessage("");
        if (e.target.name === "description") setLettersCount(e.target.value.length)
        setTask(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.title.trim() === '') {
            setTitleFieldErrorMessage("Title is required!");
            return;
        }
        updateTask({id, data: task});
        setTask(initialTaskState);
        setTitleFieldErrorMessage("");
        modalCloser();
    }

    successHandler(isSuccess, "Task updated!")
    errorHandler(isError, error);

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>Edit task</h2>
            <div className={styles.formTop}>
                <p>Title: <span className={styles.requiredSymbol}>*</span></p>
                <input 
                    maxLength={40}
                    required
                    name="title"
                    onChange={formFieldsHandler}
                    value={task.title}
                    className={styles.title} type="text" />
                    <p className='LoginPage-error-text'>{titleFieldErrorMessage}</p>
            </div>
            <textarea 
                placeholder="Description"
                maxLength={250}
                className={styles.description}
                onChange={formFieldsHandler}
                value={task.description}
                name="description"
            />
            <p>{lettersCount}/250</p>
            <button>SAVE</button>
        </form>
    )
}

export default EditForm;