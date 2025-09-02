import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function AlertDialog({
  openAlertDialog,
  handleClose,
  handleDisagree,
}) {
  return (
    <React.Fragment>
      <Dialog
        open={openAlertDialog}
        onClose={handleDisagree}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          direction: "rtl",
        }}
      >
        <DialogTitle id="alert-dialog-title">{"تأكيد الحذف"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد من أنك تريد حذف المهمة فعليا؟
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagree}>إغلاق</Button>
          <Button onClick={handleClose} autoFocus>
            إحذف
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
