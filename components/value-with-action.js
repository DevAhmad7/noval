import { useDispatch, useSelector } from "noval";

export default function ValueWithActionComponent() {
  const [todo, loading] = useSelector(["todo", "assets.loading"]);

  // you can use like this
  // const { dispatch } = useDispatch();
  // const getTodo = () => dispatch(async ({ update, state, addState }) => {
  //   update({ loading: true }, "assets")

  //   const id = state?.todo?.id || 0
  //   const url = `https://jsonplaceholder.typicode.com/todos/${id + 1}`
  //   const response = await fetch(url)
  //   const todo = await response.json()

  //   addState({ loading: false }, "assets")
  //   addState({ age: todo.id, color: `${todo.userId}_${todo.id}` }, "info")
  //   update({ todo })
  // })

  // or use this
  const { dispatch, addState, dirty } = useDispatch();
  const getTodo = async () => {
    dispatch({ loading: true }, "assets")

    const id = todo?.id || 0
    const url = `https://jsonplaceholder.typicode.com/todos/${id + 1}`
    const response = await fetch(url)
    const todoData = await response.json()

    addState({ loading: false }, "assets")
    addState({ age: todoData.id, color: `${todoData.userId}_${todoData.id}` }, "info")
    await dispatch({ todo: todoData })
  }

  // you can use dirty as string or array
  // const clearData = () => dirty("todo.title");
  const clearData = () => dirty(["todo", "info.age"]);
  // todo and assets.loading will be removed from main State

  return (<>
    <button onClick={getTodo}>
      {loading ? "loading ..." : "get todo!"}
    </button>
    {todo && <div className="flex flex-col items-center">
      <span>id: {todo.id}</span>
      <span>title: {todo.title}</span>
      <span>completed: {todo.completed.toString()}</span>
    </div>}
    <button onClick={clearData}>
      Clear Data
    </button>
  </>)
}