import { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import styles from "./Forms.module.css";
import { useAddTaskMutation } from "../../store/services/taskService";
import errorHandler from "../../helpers/errorHandler";
import successHandler from "../../helpers/successHandler";
import ITaskDto from "../../interfaces/ITaskDto";

interface IAddFormProps {
    modalCloser: () => void
}

const initialTaskState: ITaskDto = {
    title: "",
    description: ""
}

const AddForm: FC<IAddFormProps> = ({modalCloser}): ReactElement => {
    const [task, setTask] = useState(initialTaskState)
    const [lettersCount, setLettersCount] = useState(0);
    const [titleFieldErrorMessage, setTitleFieldErrorMessage] = useState<string>("");
    const [addTask, {isError, isSuccess, error}] = useAddTaskMutation();

    const formFieldsHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setTitleFieldErrorMessage("");
        if (e.target.name === "description") setLettersCount(e.target.value.length)
        setTask(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    const submitHandler = (e: FormEvent) => {
        e.preventDefault();
        if (task.title.trim() === '') {
            setTitleFieldErrorMessage("Title is required!");
            return;
        }
        addTask(task);
        setTask(initialTaskState);
        setTitleFieldErrorMessage("");
        modalCloser();
    }

    successHandler(isSuccess, "New task is added!")
    errorHandler(isError, error);

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <h2>New task</h2>
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
            <button>ADD</button>
        </form>
    )
}

export default AddForm