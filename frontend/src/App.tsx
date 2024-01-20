import Todo from "./containers/Todo/Todo"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer theme="dark" autoClose={2000} />
      <Todo />
    </>
  )
}

export default App
