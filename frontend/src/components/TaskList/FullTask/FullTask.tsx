import { FC, ReactElement } from "react";
import styles from "./FullTask.module.css";

interface IFullTaskProps {
    title: string
    description: string
    datetime: Date | string
}


const FullTask: FC<IFullTaskProps> = ({title, description, datetime}): ReactElement => {
    return (
        <div className={styles.fullTask}>
            <div className={styles.fullTaskTop}>
                <p className={styles.fullTaskTitle}><b>Title:</b> {title}</p>
                <p><b>Created: </b>{new Date(datetime).toLocaleDateString()}</p>
            </div>
            <p className={styles.fullTaskDescription}><b>Description:</b> {description}</p>
        </div>
    )
}

export default FullTask;