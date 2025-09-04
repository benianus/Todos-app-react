import "./styles/App.css";
import AppTitle from "./components/AppTitle";
import TodoCard from "./components/TodoCard";
import Input from "./components/Input";
import "./data/todos.jsx";
import CategoriesBar from "./components/CategoriesBar";
import { useEffect, useState } from "react";
import {
  InputContext,
  SnackbarContext,
  TabContext,
  TodosContext,
} from "./contexts/TodosContext.jsx";
import { getFromLocalStorage, saveInLocalStorage } from "./helpers.js";
import AlertDialog from "./components/AlertDialog.jsx";
import SimpleSnackbar from "./components/SimpleSnackbar.jsx";
import FormDialog from "./components/FormDialog.jsx";
import toast, { Toaster } from "react-hot-toast";

const notify = (message) => toast.success(message);
const error = (message) => toast.error(message);

function App() {
  /**
   * keys: allTasks, doneTasks, undoneTasks
   * get data from local storage
   */
  const allTasks = getFromLocalStorage("allTasks");

  // states
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [tabValue, setTabValue] = useState(2);
  const [todos, setTodos] = useState(allTasks ?? []);
  const [todo, setTodo] = useState({});
  const [inputValue, setInputValue] = useState("");

  function handleClickOpenAlertDialog(task) {
    setTodo(task);
    setOpenAlertDialog(true);
  }
  /***
   * get the tasks depends on the tab category
   * all - done - undone
   */

  function handleCloseAlertDialog() {
    setOpenAlertDialog(false);
    handleDeleteClick(todo.id);
  }

  function handleDisagreeAlertDialog() {
    setOpenAlertDialog(false);
    error("Task Delete Canceled");
  }

  function handleDeleteClick(todoId) {
    let tasks = todos.filter((t) => {
      return t.id != todoId;
    });
    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
    notify("Tasks Deleted Successfully");
  }

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    error("Task Update Canceled")
  };

  const handleSubmitFormDialog = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.task;
    handleEditClick(title);
    handleCloseFormDialog();
    notify("Task Edited Successfully");
  };

  const handleClickOpen = (task) => {
    setTodo(task);
    setOpenFormDialog(true);
  };

  function handleDoneClick(task) {
    setTodo(task);
    let tasks = todos.map((todo) => {
      if (todo.isDone == false && todo.id == task.id) {
        notify("Tasks Completed Successfully");
        return { ...todo, isDone: true };
      } else if (todo.isDone == true && todo.id == task.id) {
        notify("Tasks Not Completed Successfully");
        return { ...todo, isDone: false };
      }
      return todo;
    });
    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
  }

  function handleEditClick(title) {
    let tasks = todos.map((t) => {
      return t.id == todo.id ? { ...t, title: title } : t;
    });

    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
  }
  function handleAddBtn(value) {
    if (value) {
      setTodos([
        ...todos,
        {
          id: todos.length + 1,
          title: value,
          isDone: false,
        },
      ]);
    }
    setInputValue("");
    /**
     * show the alert dialog if the input value is not empty
     */
    if (value) {
      notify("Task Added Successfully");
    }
    /***
     * save task to the local storage
     */
    // saveInLocalStorage("allTasks", todos);
  }
  var tasks = getTabContent(
    tabValue,
    tasks,
    todos,
    handleDoneClick,
    handleClickOpenAlertDialog,
    handleClickOpen
  );

  useEffect(() => {
    saveInLocalStorage("allTasks", todos);
  }, [todos]);

  return (
    <>
      <Toaster position="bottom-left" reverseOrder={false} />
      <AlertDialog
        openAlertDialog={openAlertDialog}
        handleClose={handleCloseAlertDialog}
        handleDisagree={handleDisagreeAlertDialog}
      />
      <FormDialog
        open={openFormDialog}
        setOpen={setOpenFormDialog}
        handleClose={handleCloseFormDialog}
        handleSubmit={handleSubmitFormDialog}
        title={todo.title}
      />

      <TodosContext.Provider value={{ todos, setTodos }}>
        <InputContext.Provider value={{ inputValue, setInputValue }}>
          <TabContext.Provider value={{ tabValue, setTabValue }}>
            <div className="mainContainer">
              <AppTitle />
              <CategoriesBar />
              {tasks}
              <Input handleAddBtn={handleAddBtn} />
            </div>
          </TabContext.Provider>
        </InputContext.Provider>
      </TodosContext.Provider>
    </>
  );
}

export default App;

function getTabContent(
  tabValue,
  tasks,
  todos,
  handleDoneClick,
  handleClickOpenAlertDialog,
  handleClickOpen
) {
  if (tabValue == 2) {
    tasks = todos.map((todo) => {
      return (
        <TodoCard
          key={todo.id}
          todo={todo}
          handleDoneClick={handleDoneClick}
          handleClickOpenAlertDialog={handleClickOpenAlertDialog}
          handleClickOpen={handleClickOpen}
        />
      );
    });
  } else if (tabValue == 1) {
    tasks = todos.map((todo) => {
      if (todo.isDone == true) {
        return (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleDoneClick={handleDoneClick}
            handleClickOpenAlertDialog={handleClickOpenAlertDialog}
            handleClickOpen={handleClickOpen}
          />
        );
      }
    });
  } else {
    tasks = todos.map((todo) => {
      if (todo.isDone == false) {
        return (
          <TodoCard
            key={todo.id}
            todo={todo}
            handleDoneClick={handleDoneClick}
            handleClickOpenAlertDialog={handleClickOpenAlertDialog}
            handleClickOpen={handleClickOpen}
          />
        );
      }
    });
  }
  return tasks;
}
