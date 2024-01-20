import { FC, ReactNode } from "react";
import Backdrop from "../Backdrop/Backdrop";
import styles from "./Modal.module.css";


interface IModalProps {
    children: ReactNode,
    show: boolean,
    closed: () => void
}

const Modal: FC<IModalProps> = (props) => {
    return (
        <>
            <Backdrop 
                show={props.show}
                clicked={props.closed}
            />
            <div 
                className={styles.Modal}
                style={{
                    transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0'
                }}
            >
                {props.children}
            </div>
        </>
    )
}

export default Modal