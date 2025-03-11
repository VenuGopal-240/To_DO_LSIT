import { Container, Grid, TextField, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
import { loginReq,register } from "../Util/api";
import { MyContext } from "../App";
const LoginPage = () => {
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const {setUser,setNotifications,setIsLoaded} = useContext(MyContext);

  const classes = useStyles();

  const onClickRegister = () => {
    setIsRegisterForm(true);
  };

  const onClickBack = () => {
    setIsRegisterForm(false);
  };

   const navigate = useNavigate();

  const onClickLogin = (values) => {   
    loginReq(values)
      .then((res) => {       
        setUser(res);
        sessionStorage.setItem("user", JSON.stringify(res));
        setNotifications([
          {
            message: "Login Success",
            severity: "success",
          },
        ]);
        navigate("/home");
        removeNotification();
      })
      .catch((err) => {
          setNotifications([
            {
              message: "Login Failed",
              severity: "error",
            },
          ]);
          removeNotification();
      });
      navigate("/home");
  };

  const onClickSave = (values) => {
    setIsLoaded(false);
    register(values)
      .then((res) => {
        setNotifications([
          {
            message: "Registration Success",
            severity: "success",
          },
        ]);
        setIsRegisterForm(false);
        setIsLoaded(true);
        removeNotification();
      })
      .catch((_) => {
        setNotifications([
          {
            message: "Registration Failed",
            severity: "success",
          },
        ]);
        setIsLoaded(true);
        removeNotification();
      });
  };
  const removeNotification = () => {
    setTimeout(() => {
      setNotifications([]);
    }, 1000);
  };
  
  

  return (
    <>
    <Grid className={classes.flexDirection}>
      <Grid className={classes.leftFlex}>
        
      </Grid>

      <Grid container className={classes.mainContainer} columnSpacing={1}>
        {isRegisterForm ? (
          <Grid item xs={6}>
            <RegisterForm onClickBack={onClickBack} onClickSave={onClickSave} />
          </Grid>
        ) : (
          <Grid item xs={6}>
            <LoginForm
              onClickRegister={onClickRegister}
              onClickLogin={onClickLogin}
            />
          </Grid>
        )}
      </Grid>
    </Grid>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
    flexDirection:{
        display:"flex",
        flexDirection:"column",
    },
    leftFlex:{
        backgroundImage: `url("Images/lion-using-laptop_1027380-944.jpg")`,
        height: "100vh",
        width:"100vw",
        backgroundSize:"100% 100%",
    },
  mainContainer: {
    paddingTop: "2rem",
    paddingBottom: "2rem",
    backgroundColor: "aliceblue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default LoginPage;
