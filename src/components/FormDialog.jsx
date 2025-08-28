import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function FormDialog({ open, handleClose, handleSubmit, title }) {
  const [value, setValue] = useState(title);

  function handleValueChange(event){
    setValue(event.target.value)
  }
  
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button> */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Edit Task</DialogTitle>
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
              onChange={(e) => handleValueChange(e)}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
