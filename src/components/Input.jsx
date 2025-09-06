import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { useContext } from "react";
import { useInput } from "../contexts/InputContext";

export default function Input({ handleAddBtn }) {
  // const { inputValue, setInputValue } = useContext(InputContext);
  const { inputValue, setInputValue } = useInput();

  function handleInputValue(event) {
    setInputValue(event.target.value);
  }

  return (
    <>
      {/* <SimpleSnackbar
        open={openSnackbar}
        handleClose={handleCloseSnackBar}
        message={message}
      /> */}
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
