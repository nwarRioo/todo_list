import { useGetTasksQuery } from "./store/services/taskService"


const App = () => {
  const {data} = useGetTasksQuery("");
  return (
    <>
      <h1>Hello world!</h1>
      {JSON.stringify(data)}
    </>
  )
}

export default App
