import { FC, ReactNode } from "react";
import styles from "./Modal.module.css";

interface IModalProps {
    children: ReactNode,
    show: boolean,
    closed: () => void
}

const Modal: FC<IModalProps> = ({show, closed, children}) => {
    return (
        <div className={styles.modalContainer}>
            <div 
                    onClick={(e) => e.stopPropagation()}
                    className={styles.modal}
                    style={{
                        transform: show ? 'translateY(40vh)' : 'translateY(-100vh)',
                        opacity: show ? '1' : '0'
                    }}
                >
                    {children}
                </div>
            {show ? <div onClick={closed} className={styles.backdrop}/> : null}
        </div>
    )
}

export default Modal