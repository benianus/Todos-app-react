import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import {
  InputContext,
  SnackbarContext,
  TodosContext,
} from "../contexts/TodosContext";
import SimpleSnackbar from "./SimpleSnackbar";

export default function Input() {
  const { inputValue, setInputValue } = useContext(InputContext);
  const { todos, setTodos } = useContext(TodosContext);
  const { openSnackbar, message, setMessage, setOpenSnackBar } =
    useContext(SnackbarContext);

  const handleCloseSnackBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSnackBar(false);
  };

  function handleInputValue(event) {
    setInputValue(event.target.value);
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
    setMessage("Task Added Successfully");
    /**
     * show the alert dialog if the input value is not empty
     */
    if (value) {
      setOpenSnackBar(true);
    }
    /***
     * save task to the local storage
     */
    // saveInLocalStorage("allTasks", todos);
  }

  return (
    <>
      <SimpleSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackBar}
        message={message}
      />
      <Stack
        direction="row"
        spacing={2}
        sx={{
          width: "100%",
        }}
      >
        <Button
          variant="contained"
          color="secondary"
          sx={{
            width: "30%",
            fontFamily: "Tajawal, sans serif",
            fontSize: "16px",
          }}
          onClick={() => handleAddBtn(inputValue)}
          disabled={inputValue ? false : true}
        >
          إضافة
        </Button>
        <TextField
          id="outlined-basic"
          variant="outlined"
          sx={{
            width: "70%",
            fontFamily: "Tajawal, sans serif",
          }}
          value={inputValue}
          onChange={(event) => handleInputValue(event)}
          label="عنوان المهمة"
        />
      </Stack>
    </>
  );
}
