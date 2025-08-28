import "./styles/App.css";
import AppTitle from "./components/AppTitle";
import TodoCard from "./components/TodoCard";
import Input from "./components/Input";
import "./data/todos.jsx";
import CategoriesBar from "./components/CategoriesBar";
import { useState } from "react";
import {
  InputContext,
  SnackbarContext,
  TabContext,
  TodosContext,
} from "./contexts/TodosContext.jsx";
import { getFromLocalStorage, saveInLocalStorage } from "./helpers.js";

function App() {
  /**
   * keys: allTasks, doneTasks, undoneTasks
   * get data from local storage
   */
  const allTasks = getFromLocalStorage("allTasks");

  const [tabValue, setTabValue] = useState(2);
  const [todos, setTodos] = useState(allTasks ? allTasks : []);
  const [openSnackbar, setOpenSnackBar] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  var tasks = getTabContent(tabValue, tasks, todos);

  saveInLocalStorage("allTasks", todos);

  return (
    <>
      <TodosContext.Provider value={{ todos, setTodos }}>
        <InputContext.Provider value={{ inputValue, setInputValue }}>
          <SnackbarContext.Provider
            value={{
              openSnackbar,
              message: snackbarMessage,
              setMessage: setSnackbarMessage,
              setOpenSnackBar,
            }}
          >
            <TabContext.Provider value={{ tabValue, setTabValue }}>
              <div className="mainContainer">
                <AppTitle />
                <CategoriesBar />
                {tasks}
                <Input />
              </div>
            </TabContext.Provider>
          </SnackbarContext.Provider>
        </InputContext.Provider>
      </TodosContext.Provider>
    </>
  );
}

export default App;

function getTabContent(tabValue, tasks, todos) {
  if (tabValue == 2) {
    tasks = todos.map((todo) => {
      return <TodoCard key={todo.id} title={todo.title} id={todo.id} />;
    });
  } else if (tabValue == 1) {
    tasks = todos.map((todo) => {
      if (todo.isDone == true) {
        return <TodoCard key={todo.id} title={todo.title} id={todo.id} />;
      }
    });
  } else {
    tasks = todos.map((todo) => {
      if (todo.isDone == false) {
        return <TodoCard key={todo.id} title={todo.title} id={todo.id} />;
      }
    });
  }
  return tasks;
}
