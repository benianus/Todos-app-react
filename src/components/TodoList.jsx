import AppTitle from "./components/AppTitle";
import TodoCard from "./components/TodoCard";
import Input from "./components/Input";
import "./data/todos.jsx";
import CategoriesBar from "./components/CategoriesBar";
import { useEffect, useReducer, useState } from "react";
import { TodosContext } from "./contexts/TodosContext.jsx";
import { TabContext } from "./contexts/TabsContext.jsx";
import { InputProvider, useInput } from "./contexts/InputContext.jsx";
import { getFromLocalStorage, saveInLocalStorage } from "./helpers.js";
import AlertDialog from "./components/AlertDialog.jsx";
import FormDialog from "./components/FormDialog.jsx";
import toast, { Toaster } from "react-hot-toast";
import { reducer } from "./reducers/todosReducer.jsx";

const notify = (message) => toast.success(message);
const error = (message) => toast.error(message);

function TodoList() {
  /**
   * keys: allTasks, doneTasks, undoneTasks
   * get data from local storage
   */
  const allTasks = getFromLocalStorage("allTasks");
  // states
  const [openFormDialog, setOpenFormDialog] = useState(false);
  const [openAlertDialog, setOpenAlertDialog] = useState(false);
  const [tabValue, setTabValue] = useState(2);
  const [todo, setTodo] = useState({});
  // Use useReducer Hook
  const [todos, setTodosDispatch] = useReducer(reducer, allTasks ?? []);

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
    error("تم إلغاء حذف المهمة");
  }

  function handleDeleteClick(todoId) {
    setTodosDispatch({ type: "delete", payload: { todoId: todoId } });
    notify("تم الحذف بنجاح");
  }

  const handleCloseFormDialog = () => {
    setOpenFormDialog(false);
    error("تم إلغاء تعديل المهمة");
  };

  const handleSubmitFormDialog = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.task;
    handleEditClick(title, todo);
    handleCloseFormDialog();
    notify("تم التعديل بنجاح");
  };

  const handleClickOpen = (task) => {
    setTodo(task);
    setOpenFormDialog(true);
  };

  function handleDoneClick(task) {
    setTodo(task);
    setTodosDispatch({ type: "complete", payload: { task: task } });

    if (todo.isDone) {
      notify("تم إنهاء المهمة بنجاح");
    } else {
      error("تم إلغاء الإنهاء بنجاح");
    }
  }

  function handleEditClick(title, todo) {
    setTodosDispatch({ type: "edit", payload: { title: title, todo: todo } });
  }

  function handleAddBtn(title) {
    setTodosDispatch({ type: "create", payload: { title: title } });
    /**
     * show the alert dialog if the input value is not empty
     */
    if (title) {
      notify("تم إضافة المهمة بنجاح");
    }
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

      <TodosContext.Provider value={{ todos }}>
        <InputProvider>
          <TabContext.Provider value={{ tabValue, setTabValue }}>
            <div className="mainContainer">
              <AppTitle />
              <CategoriesBar />
              {tasks}
              <Input handleAddBtn={handleAddBtn} />
            </div>
          </TabContext.Provider>
        </InputProvider>
      </TodosContext.Provider>
    </>
  );
}

export default TodoList;

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
