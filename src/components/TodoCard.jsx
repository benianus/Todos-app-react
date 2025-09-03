import Stack from "@mui/material/Stack";
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import "../styles/TodoCard.css";

export default function TodoCard({
  todo,
  handleDoneClick,
  handleClickOpenAlertDialog,
  handleClickOpen,
}) {
  return (
    <>
      <Stack
        className="card"
        direction={"row"}
        spacing={2}
        sx={{
          width: "100%",
          color: "white",
          marginTop: "16px",
          marginBottom: "16px",
          borderRadius: "8px",
          backgroundColor: "indigo",
          boxShadow: "0px 0px 0px 0px rgba(0, 0, 0, 0.2)",
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
          <IconButton onClick={() => handleDoneClick(todo)}>
            <DoneIcon
              className="onHover"
              sx={{
                backgroundColor: todo.isDone ? "green" : "white",
                color: todo.isDone ? "white" : "green",
                padding: "8px",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          </IconButton>
          <IconButton onClick={() => handleClickOpen(todo)}>
            <EditIcon
              className="onHover"
              sx={{
                backgroundColor: "white",
                color: "blue",
                padding: "8px",
                borderRadius: "50%",
                border: "1px solid blue",
              }}
            />
          </IconButton>
          <IconButton onClick={() => handleClickOpenAlertDialog(todo)}>
            <DeleteIcon
              className="onHover"
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
          <p class={todo.isDone ? "todoText" : ""}>{todo.title}</p>
        </Stack>
      </Stack>
    </>
  );
}
