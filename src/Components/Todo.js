import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addTodo,
  setCompleted,
  deleteTodo,
  getTodoUncompleted,
  getAllTodo,
  getTodoCompleted,
  checkAllComplete,
  unCheckAll,
  updateTodo,
  unCheckTodoCompleted,
} from "../redux/reducers/todolist";
import {
  BsCheckAll,
  BsCheck2Circle,
  BsCircle,
  BsCheckLg,
} from "react-icons/bs";
import { FaRegTrashAlt, FaEdit } from "react-icons/fa";

function Todo(props) {
  let todoList = useSelector((state) => state.todo.todosList);

  const countUncompleted = todoList.filter((item) => item.completed === false);

  const isAllCompleted = todoList.every((todo) => todo.completed === true);
  const isSomeCompleted = todoList.some((todo) => todo.completed === true);

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
        alert("Active already exist");
        return;
      } else {
        const newTodo = {
          id: uuidv4(),
          content: value,
          completed: false,
        };

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
    dispatch(getTodoUncompleted());
  };

  const handleGetAllTodo = () => {
    dispatch(getAllTodo());
  };

  const handleGetTodoCompleted = () => {
    dispatch(getTodoCompleted());
  };

  const handleCheckAllCompleted = () => {
    dispatch(checkAllComplete());
  };

  const handleUnCheckAll = () => {
    dispatch(unCheckAll());
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
    if (value.length === 0) {
      document.getElementById(todo.id).removeAttribute("placeholder");
    }
    const newUpdate = {
      id: todo.id,
      newContent: value,
    };

    if (e.keyCode === 13) {
      if (value.length === 0) {
        dispatch(deleteTodo(todo.id));
      } else {
        dispatch(updateTodo(newUpdate));
        document.getElementById(todo.id).setAttribute("disabled", "disabled");
      }
    }
  };

  const HandleUnCheckCompleted = () => {
    dispatch(unCheckTodoCompleted());
  };

  return (
    <>
      <div className="flex flex-col bg-[#f5f5f5] ">
        <div className=" flex mt-6 h-[10vh] items-center justify-center text-[100px] leading-[19.6px] text-[#af2f2f]">
          <p>Todo List</p>
        </div>
        <div className=" flex items-start justify-center h-fit  mt-10 drop-shadow-2xl">
          <div className="w-[550px] h-[90vh]">
            <div className="w-[550px] h-[62px] flex border-[1px] sticky top-0">
              <div className="bg-white flex items-center justify-center w-[80px]">
                {isAllCompleted ? (
                  <BsCheckAll size="50px" />
                ) : (
                  <BsCheckLg size="30px" />
                )}
              </div>
              <input
                id="init"
                className=" w-[inherit] h-[60px] pl-1 border-none focus:outline-none"
                onKeyUp={handleAddTodo}
                type="text"
                placeholder="What needs to be done?"
              ></input>
            </div>
            {todoList.map((todo) => {
              return (
                <div
                  className=" flex items-center  w-[550px] max-h-fit min-h-[66px] border-solid border-[1px] bg-white"
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
              }  flex flex-row w-[550px] pb-5 h-[50px] pl-2 bg-white border-solid border-2
                sticky bottom-0 mb-3 
              
              `}
            >
              {countUncompleted.length <= 1
                ? `${countUncompleted.length} item left`
                : `${countUncompleted.length} items left`}
              {isAllCompleted ? (
                <button
                  onClick={() => handleUnCheckAll()}
                  className="ml-[100px] mr-[10px] hover:font-medium"
                >
                  Uncheck all
                </button>
              ) : (
                <button
                  onClick={() => handleCheckAllCompleted()}
                  className="ml-[70px] mr-[10px] hover:font-medium"
                >
                  Check All
                </button>
              )}
              {isSomeCompleted && !isAllCompleted ? (
                <button
                  className="mr-[10px] hover:font-medium"
                  onClick={HandleUnCheckCompleted}
                >
                  Uncheck completed
                </button>
              ) : (
                ""
              )}

              {isSomeCompleted ? (
                <button
                  onClick={handleClearCompleted}
                  className="hover:font-medium"
                >
                  Clear completed
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Todo;
