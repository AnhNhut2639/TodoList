import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todosList: [],
};

const TodoReducer = createSlice({
  name: "todoReducer",
  initialState,
  reducers: {
    addTodo(state, action) {
      const { id, content, completed } = action.payload;
      state.todosList = [{ id, content, completed }, ...state.todosList];
    },
    setCompleted(state, action) {
      let id = action.payload;
      const todo = state.todosList.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    deleteTodo(state, action) {
      let todoId = action.payload;
      state.todosList = state.todosList.filter((todo) => todo.id !== todoId);
    },
    getTodoUncompleted(state, action) {
      state.todosList = state.todosList.filter(
        (todo) => todo.completed === false
      );
    },
    getTodoCompleted(state, action) {
      state.todosList = state.todosList.filter(
        (todo) => todo.completed === true
      );
    },

    getAllTodo(state, action) {
      state.todosList = state.todosList.filter((todo) => todo.id.length > 1);
    },
    checkAllComplete(state, action) {
      state.todosList = state.todosList.map((todo) => {
        if (todo.completed) {
          return {
            id: todo.id,
            content: todo.content,
            completed: true,
          };
        }
        return {
          id: todo.id,
          content: todo.content,
          completed: true,
        };
      });
    },
    unCheckAll(state, action) {
      state.todosList = state.todosList.map((todo) => {
        return {
          id: todo.id,
          content: todo.content,
          completed: false,
        };
      });
    },
    checkExistedTodo(state, action) {
      let value = action.payload;
      let existed = state.todosList.find((todo) => todo.content === value);
      if (existed) {
        existed.content = value;
      }
    },
    updateTodo(state, action) {
      let { id, newContent } = action.payload;
      const todo = state.todosList.find((todo) => todo.id === id);
      if (todo) {
        todo.content = newContent;
      }
    },
    unCheckTodoCompleted(state, action) {
      state.todosList = state.todosList.map((todo) => {
        return {
          id: todo.id,
          content: todo.content,
          completed: false,
        };
      });
    },
  },
});

export const {
  addTodo,
  setCompleted,
  deleteTodo,
  getTodoUncompleted,
  getAllTodo,
  getTodoCompleted,
  checkAllComplete,
  unCheckAll,
  checkExistedTodo,
  updateTodo,
  unCheckTodoCompleted,
} = TodoReducer.actions;
export default TodoReducer.reducer;
