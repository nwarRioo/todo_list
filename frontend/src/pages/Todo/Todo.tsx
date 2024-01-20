import { FC, ReactElement } from "react";
import styles from "./Todo.module.css";
import TaskList from "../../components/TaskList/TaskList";


const Todo: FC = (): ReactElement => {
    return (
        <div className={styles.todo}>
            <TaskList />
        </div>
    )
}

export default Todo