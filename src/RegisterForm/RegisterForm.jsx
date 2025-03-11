import { Grid, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from "@mui/styles";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import { Field, Form, withFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-mui";

const Component = ({ onClickBack }) => {
  const classes = useStyles();

  return (
    <Form autoComplete="off">
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <h2 style={{ color: "black" }}>Register</h2>
          <Typography style={{ color: "gray" }}>Create new account</Typography>
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Full Name*</label>
          <Field
            fullWidth
            name="fullName"
            inputProps={{ style: { backgroundColor: "white" } }}
            required
            component={TextField}
            placeholder="Enter your name"
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Phone Number*</label>
          <Field
            name="mobileNumber"
            inputProps={{ style: { backgroundColor: "white" } }}
            fullWidth
            component={TextField}
            placeholder="Enter phone num"
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Email Address<span >*</span></label>
          <Field
            name="emailId"
            inputProps={{ style: { backgroundColor: "white" } }}
            fullWidth
            required
            component={TextField}
            placeholder="Enter your email"
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Username*</label>
          <Field
            name="userName"
            inputProps={{ style: { backgroundColor: "white" } }}
            fullWidth
            required
            component={TextField}
            placeholder="Enter User name"
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Password*</label>
          <Field
            name="password"
            inputProps={{ style: { backgroundColor: "white" } }}
            fullWidth
            required
            component={TextField}
            placeholder="*********"
          />
        </Grid>
        <Grid item xs={12} className={classes.flexSpaceBetween}>
          <button
            type="submit"
            className={classes.backbtn}
            onClick={onClickBack}
          >
            <KeyboardBackspaceIcon /> Back
          </button>
          <button type="submit" className={classes.btn}>
            Save
          </button>
        </Grid>
      </Grid>
    </Form>
  );
};

const RegisterForm = withFormik({
  mapPropsToValues: () => ({
    fullName: "",
    mobileNumber: "",
    emailId: "",
    userName: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    fullName: Yup.string().required("Name is required"),
    mobileNumber: Yup.string().required("Mob No is required"),
    emailId: Yup.string().required("email is required"),
    userName: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onClickSave(values);
  },
})(Component);

const useStyles = makeStyles((theme) => ({
  flexSpaceBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backbtn: {
    border: "none",
    borderRadius: 20,
    padding: "5px 2rem",
    // background: appColors.RED,
    // color: appColors.WHITE,
    "&:hover": {
      opacity: 0.5,
    },
    display: "flex",
    alignItems: "center",
  },
  btn: {
    border: "none",
    borderRadius: 20,
    padding: "10px 2rem",
    // background: appColors.GREEN,
    // color: appColors.WHITE,
    "&:hover": {
      opacity: 0.5,
    },
  },
}));

export default RegisterForm;
