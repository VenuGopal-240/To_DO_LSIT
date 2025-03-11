import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Field, Form, withFormik } from "formik";
import PasswordField from "../PasswordField/PasswordField";
import { TextField } from "formik-mui";
import React from "react";
import * as Yup from "yup";

const Component = ({ onClickRegister, onClickLogin }) => {
  const classes = useStyles();
  return (
    <Form autoComplete="off">
      <Grid container rowSpacing={1} className={classes?.mainContainer}>
        <Grid item xs={12}>
          <h2 style={{ color: "black" }}>Login</h2>
          <Typography style={{ color: "gray" }}>
            Welcome to your account
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>User Name</label>
          <Field
            fullWidth
            name="userName"
            inputProps={{ style: { backgroundColor: "white" } }}
            required
            placeholder="Enter your User Name"
            component={TextField}
          />
        </Grid>
        <Grid item xs={12}>
          <label className={classes?.label}>Password</label>
          <Field
            name="password"
            inputProps={{ style: { backgroundColor: "white" } }}
            fullWidth
            required
            placeholder="**********************"
            component={PasswordField}
          />
        </Grid>
        <Grid item xs={12} className={classes.spacebetween}>
          <button className={classes.registerBtn} onClick={onClickRegister}>
            Register
          </button>
          <button type="submit" className={classes.btn}>
            Login
          </button>
        </Grid>
      </Grid>
    </Form>
  );
};

const LoginForm = withFormik({
  mapPropsToValues: () => ({
    userName: "",
    password: "",
  }),
  validationSchema: Yup.object().shape({
    userName: Yup.string().required("Please Enter UserName"),
    password: Yup.string().required("Please Enter Password"),
  }),
  handleSubmit: (values, { props, setSubmitting }) => {
    setSubmitting(false);
    props.onClickLogin(values);
  },
})(Component);

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    height: "350px",
  },
  spacebetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  btn: {
    border: "none",
    borderRadius: 20,
    padding: "10px 2rem",
    background: "green",
    color: "white",
    "&:hover": {
      opacity: 0.5,
    },
  },
  registerBtn: {
    border: "none",
    borderRadius: 20,
    padding: "10px 2rem",
    background: "red",
    color: "white",
    "&:hover": {
      opacity: 0.5,
    },
  },
  label: {
    color: "black",
  },
}));

export default LoginForm;
