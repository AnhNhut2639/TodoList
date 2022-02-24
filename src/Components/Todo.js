import React from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setCompleted } from "../redux/reducers/todolist";

function Todo(props) {
  const todoList = useSelector((state) => state.todo.todosList);
  const dispatch = useDispatch();
  const handleAddTodo = (e) => {
    const value = e.target.value;
    if (e.keyCode === 13) {
      if (value === "") {
        alert("please type something");
        return;
      }
      const newTodo = {
        id: uuidv4(),
        content: value,
        completed: false,
      };

      dispatch(addTodo(newTodo));
      e.target.value = "";
    }
  };

  const handleSetCompleted = (todo) => {
    dispatch(setCompleted(todo.id));
  };
  return (
    <>
      <h1>Todos List</h1>

      <div>
        <input onKeyUp={handleAddTodo} placeholder="What needs to be done?" />
      </div>

      {todoList.map((todo) => {
        return (
          <div
            className={todo.completed && "line-through"}
            key={todo.id}
            onClick={() => handleSetCompleted(todo)}
          >
            {todo.content}
          </div>
        );
      })}
    </>
  );
}

export default Todo;
