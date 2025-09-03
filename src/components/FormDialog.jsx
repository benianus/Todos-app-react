import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { useEffect } from "react";

export default function FormDialog({ open, handleClose, handleSubmit, title }) {
  const [value, setValue] = useState("");

  useEffect(() => {
    setValue(title);
  }, [title]);

  function handleValueChange(value) {
    setValue(value);
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        sx={{ direction: "rtl" }}
      >
        <DialogTitle>تعديل المهمة</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <form onSubmit={handleSubmit} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="task"
              name="task"
              type="text"
              fullWidth
              variant="standard"
              value={value}
              onChange={(e) => handleValueChange(e.target.value)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>إغلاق</Button>
          <Button type="submit" form="subscription-form">
            تحديث
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
