import { makeStyles } from "@mui/styles";
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography } from "@mui/material";

export const Header = ({ children }) => {
  const classes = useStyles();
  const navigate = useNavigate(); 

  const onClickMenu = (url, name) => {
   
  };

  return (
    <>
      <Grid className={classes.mainContainer}>
       
          <Grid className={classes.flexSpace}> 
            <Grid className={classes.borders}>
            <ul className={classes.menu}>
              <li
                // className={
                //   selectedMenu === "home" ? classes.selectedmenu : classes.menu
                // }
                 onClick={() => navigate("/home/TaskPage")}
              >
                Tasks
              </li>
              <li
                // className={
                //   selectedMenu === "cart" ? classes.selectedmenu : classes.menu
                // }
                 onClick={() => navigate("/home/createPage")}
              >
                Create
              </li>
              <li
                // className={
                //   selectedMenu === "orders"
                //     ? classes.selectedmenu
                //     : classes.menu
                // }
                 onClick={() => navigate("/login")}
              >
                LOGOUT
              </li>              
            </ul>
            </Grid>
          </Grid>
       
      </Grid>
      {children}
    
      
    </>
  );
};

export default Header;

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    // background:"lightpink",
    backgroundImage:`url("Images/clock.jpg")`,
    padding: "2rem",
    backgroundSize: "100% 100%",
    
  },
  borders:{
    border:"3px solid black",
    padding:"20px",
    borderRadius:"30px",
    background:"lightyellow",
  },
  flexSpace: {
    display: "flex",
    justifyContent: "end",  
  },
  menu: {
    margin: 0,
    padding: 0,
    "& li": {
      display: "inline-block",
      listStyle: "none",
      marginLeft: "2rem",
      fontWeight: 700,
      "&:hover": {
         color: "RED",
        cursor: "pointer",
      },
    },
  },
  selectedmenu: {
    color: "blue",
  },
}));


