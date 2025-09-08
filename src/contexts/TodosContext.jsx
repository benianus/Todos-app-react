import { createContext, useContext, useReducer } from "react";
import { reducer } from "../reducers/todosReducer";

export const TodosContext = createContext([]);

const TodosProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <>
      <TodosContext.Provider
        value={{ todos: state, setTodosDispatch: dispatch }}
      >
        {children}
      </TodosContext.Provider>
    </>
  );
};

// const useTodos = useContext(TodosContext);
