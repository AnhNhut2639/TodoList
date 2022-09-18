import React, { useEffect, useState } from "react";
import {
  BsCheck2Circle,
  BsCheckAll,
  BsCheckLg,
  BsCircle,
} from "react-icons/bs";
import { FaEdit, FaRegTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getTodoUncompleted,
  setCompleted,
  updateTodo,
} from "../redux/reducers/todolist";
import { saveToken } from "../helpers";

function Todo(props) {
  let todoList = useSelector((state) => state.todo.todosList);

  const countUncompleted = todoList.filter((item) => item.completed === false);

  const isAllCompleted = todoList.every((todo) => todo.completed === true);
  const isSomeCompleted = todoList.some((todo) => todo.completed === true);
  const [arrTodos, setArrTodos] = useState([]);

  useEffect(() => {
    setArrTodos(todoList);
  }, [todoList]);
  const dispatch = useDispatch();
  const handleAddTodo = (e) => {
    const value = e.target.value;
    let spaceCatch = value.trim();
    let isExist = todoList.some((todo) => todo.content === value);
    if (e.keyCode === 13) {
      if (value === "" || spaceCatch === "") {
        alert("Please type something");
        return;
      }
      if (isExist) {
        alert("Active already exist !!!");
        return;
      } else {
        const newTodo = {
          id: uuidv4(),
          content: value,
          completed: false,
        };
        saveToken(newTodo);
        dispatch(addTodo(newTodo));
      }

      e.target.value = "";
    }
  };
  const handleSetCompleted = (todo) => {
    dispatch(setCompleted(todo.id));
  };

  const handleDeleteTodo = (todo) => {
    dispatch(deleteTodo(todo.id));
  };

  const handleGetTodoUncompleted = () => {
    // dispatch(getTodoUncompleted());
    const todosUncompleted = todoList.filter(
      (todo) => todo.completed === false
    );
    setArrTodos(todosUncompleted);
  };

  const handleGetAllTodo = () => {
    dispatch(getAllTodo());
  };

  const handleGetTodoCompleted = () => {
    // dispatch(getTodoCompleted());
    const todosCompleted = todoList.filter((todo) => todo.completed === true);
    setArrTodos(todosCompleted);
  };
  const handleClearCompleted = () => {
    dispatch(getTodoUncompleted());
  };

  const handleEdit = (todo) => {
    document.getElementById(todo.id).removeAttribute("disabled");
    document.getElementById(todo.id).value = todo.content;
    document.getElementById(todo.id).focus();
  };

  const handleDisabled = (e, todo) => {
    let value = e.target.value;
    document.getElementById(todo.id).setAttribute("disabled", "disabled");
    const newUpdate = {
      id: todo.id,
      newContent: value,
    };
    if (value.length === 0) {
      dispatch(deleteTodo(todo.id));
    }
    dispatch(updateTodo(newUpdate));
  };

  const handleUpdate = (e, todo) => {
    const value = e.target.value;
    let isExist = todoList.some((todo) => todo.content === value);
    if (value.length === 0) {
      document.getElementById(todo.id).removeAttribute("placeholder");
    }
    const newUpdate = {
      id: todo.id,
      newContent: value,
    };
    if (e.keyCode === 13) {
      if (isExist) {
        alert("Active already exist");
        document.getElementById(todo.id).value = todo.content;
        return;
      }

      if (value.length === 0) {
        dispatch(deleteTodo(todo.id));
      } else {
        dispatch(updateTodo(newUpdate));
        document.getElementById(todo.id).setAttribute("disabled", "disabled");
      }
    }
  };
  return (
    <>
      <div className="flex flex-col bg-[#f5f5f5] ">
        <div className="flex mt-6 h-[10vh] items-center justify-center text-[80px] sm:text-[100px] leading-[19.6px]   text-[#af2f2f]">
          <p>Todo List</p>
        </div>
        <div className=" sm:flex flex items-start justify-center h-fit  mt-10 drop-shadow-2xl">
          <div className="w-[350px] sm:w-[550px]  h-[90vh]">
            <div className="w-[350px] sm:w-[550px] h-[62px] flex border-[1px] sticky top-0">
              <div className="bg-white flex items-center justify-center w-[80px]">
                {isAllCompleted ? (
                  <BsCheckAll size="50px" />
                ) : (
                  <BsCheckLg size="30px" />
                )}
              </div>
              <input
                className="sm:w-[inherit] w-[350px] h-[60px] pl-1 border-none focus:outline-none"
                onKeyUp={handleAddTodo}
                type="text"
                placeholder="What needs to be done?"
              ></input>
            </div>
            {arrTodos.map((todo) => {
              return (
                <div
                  className=" flex items-center sm:w-[550px] max-h-fit min-h-[66px] border-solid border-[1px] bg-white"
                  key={todo.id}
                >
                  <div className="grow-[0.1]  h-fit w-6 flex items-center justify-center">
                    {todo.completed ? (
                      <BsCheck2Circle
                        size="30px"
                        onClick={() => handleSetCompleted(todo)}
                      />
                    ) : (
                      <BsCircle
                        size="30px"
                        onClick={() => handleSetCompleted(todo)}
                      />
                    )}
                  </div>
                  <input
                    type="text"
                    className={`${
                      todo.completed && "line-through text-gray-500"
                    } grow-[0.7] min-h-[66px] w-6 break-all text-left  font-light text-[24px] leading-[29px] font-serif flex justify-start items-center
                    placeholder:text-black bg-white
                    `}
                    disabled={true}
                    id={todo.id}
                    onClick={() => handleEdit(todo)}
                    onBlur={(e) => handleDisabled(e, todo)}
                    placeholder={todo.content}
                    onKeyUp={(e) => {
                      handleUpdate(e, todo);
                    }}
                  />

                  <div
                    className={`grow-[0.1] flex items-center justify-center h-[inherit] w-1`}
                  >
                    <FaEdit
                      className="hover:text-blue-500"
                      size="20px"
                      onClick={() => handleEdit(todo)}
                    />
                  </div>

                  <div
                    className={`grow-[0.1] flex items-center justify-center h-[inherit] w-6`}
                  >
                    <FaRegTrashAlt
                      className="hover:text-green-700"
                      size="20px"
                      onClick={() => handleDeleteTodo(todo)}
                    />
                  </div>
                </div>
              );
            })}

            <div
              className={`${
                todoList.length <= 0 ? "hidden" : ""
              }  flex justify-between items-center sm:w-[550px] h-[50px] bg-white pl-2 border-solid border-2
                sticky bottom-0 mb-3 
              
              `}
            >
              <div className="w-1/4">
                {countUncompleted.length <= 1
                  ? `${countUncompleted.length} item left`
                  : `${countUncompleted.length} items left`}
              </div>
              <div className="w-2/4 flex items-center justify-around">
                <button
                  className="hover:font-medium"
                  onClick={() => handleGetAllTodo()}
                >
                  All
                </button>
                <button
                  className="hover:font-medium"
                  onClick={() => handleGetTodoUncompleted()}
                >
                  Active
                </button>
                <button
                  className="hover:font-medium"
                  onClick={() => handleGetTodoCompleted()}
                >
                  Completed
                </button>
              </div>
              <div className="w-1/4">
                {isSomeCompleted ? (
                  <button onClick={handleClearCompleted} className="as">
                    Clear completed
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
