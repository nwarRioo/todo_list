import { FC } from "react";
import styles from "./Backdrop.module.css";

interface IBackdropProps {
    show: boolean
    clicked: () => void
}

const Backdrop: FC<IBackdropProps> = ({show, clicked}) => {
    return (
        <>
            {show ? <div onClick={clicked} className={styles.Backdrop} /> : null}
        </>
    )
}

export default Backdrop