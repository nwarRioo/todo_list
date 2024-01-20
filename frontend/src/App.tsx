import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Todo from "./pages/Todo/Todo";

const App = () => {
  return (
    <>
      <ToastContainer theme="dark" autoClose={2000} />
      <Todo />
    </>
  )
}

export default App
