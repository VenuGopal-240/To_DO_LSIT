import React from "react";
import {
  Dialog as MuiDialog,
  DialogTitle,
  Box,
  DialogContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { makeStyles } from "@mui/styles";

const Dialog = ({
  title = "",
  children,
  open,
  onClose = () => {},
  maxWidth = "sm",
}) => {
  const classes = useStyles();
  return (
    <MuiDialog open={open} maxWidth={maxWidth}>
      <DialogTitle borderBottom={"1px solid #ccc"}>
        <Box
          className={title === "" ? classes?.withoutTitle : classes?.withTitle}
        >
          {title}
          <CloseIcon className={classes?.closeIconStyle} onClick={onClose} />
        </Box>
      </DialogTitle>
      <DialogContent sx={{ marginTop: 2 }}>{children}</DialogContent>
    </MuiDialog>
  );
};

const useStyles = makeStyles((theme) => ({
  withTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  withoutTitle: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  closeIconStyle: {
    cursor: "pointer",
  },
}));

export default Dialog;
