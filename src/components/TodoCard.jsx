import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import { useContext, useState } from "react";
import { SnackbarContext, TodosContext } from "../contexts/TodosContext";
import { saveInLocalStorage } from "../helpers";
import FormDialog from "./FormDialog";
import SimpleSnackbar from "./SimpleSnackbar";

export default function TodoCard({ title = "مهمة", id }) {
  // contexts
  const { todos, setTodos } = useContext(TodosContext);
  const { openSnackbar, message, setMessage, setOpenSnackBar } =
    useContext(SnackbarContext);
  // states
  const [open, setOpen] = useState(false);

  const handleClickSnackBar = (message) => {
    setOpenSnackBar(true);
    setMessage(message);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const title = formJson.task;
    handleEditClick(title);
    handleClose();
    handleClickSnackBar("Task Edited Successfully");
  };

  let [{ isDone }] = todos.filter((t) => {
    return t.id == id;
  });

  function handleDoneClick() {
    let tasks = todos.map((todo) => {
      if (todo.isDone == false && todo.id == id) {
        todo.isDone = true;
        handleClickSnackBar("Tasks Done Successfully");
        return todo;
      } else if (todo.isDone == true && todo.id == id) {
        todo.isDone = false;
        handleClickSnackBar("Tasks in Progress Successfully");
        return todo;
      }
      return todo;
    });

    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
  }

  function handleEditClick(title) {
    let tasks = todos.map((t) => {
      if (t.id == id) {
        t.title = title;
        return t;
      }
      return t;
    });

    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
  }

  function handleDeleteClick() {
    let tasks = todos.filter((t) => {
      return t.id != id;
    });
    setTodos(tasks);
    saveInLocalStorage("allTasks", tasks);
    handleClickSnackBar("Tasks Deleted Successfully");
  }

  return (
    <>
      <FormDialog
        open={open}
        setOpen={setOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        title={title}
      />
      <SimpleSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackBar}
        message={message}
      />
      <Stack
        direction={"row"}
        spacing={2}
        sx={{
          width: "100%",
          color: "white",
          marginTop: "16px",
          marginBottom: "16px",
          borderRadius: "8px",
          backgroundColor: "indigo",
          boxShadow: "0px 0px 0px 3px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Stack
          direction="row-reverse"
          spacing={2}
          sx={{
            width: "30%",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <IconButton onClick={handleDoneClick}>
            <DoneIcon
              sx={{
                backgroundColor: isDone ? "green" : "white",
                color: isDone ? "white" : "green",
                padding: "8px",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          </IconButton>
          <IconButton onClick={handleClickOpen}>
            <EditIcon
              sx={{
                backgroundColor: "white",
                color: "blue",
                padding: "8px",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          </IconButton>
          <IconButton onClick={handleDeleteClick}>
            <DeleteIcon
              sx={{
                backgroundColor: "white",
                color: "red",
                padding: "8px",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          </IconButton>
        </Stack>
        <Stack
          sx={{
            width: "70%",
            direction: "rtl",
            paddingRight: "8px",
            flexWrap: "wrap",
            fontSize: "32px",
          }}
        >
          <p>{title}</p>
        </Stack>
      </Stack>
    </>
  );
}
