import { makeStyles } from "@mui/styles";
import React from "react";
import { Grid, Typography } from "@mui/material";
import { Field, Form, withFormik } from "formik";
import { TextField } from "formik-mui";
import * as Yup from "yup";

const Component = ({registerByTask,OnClickClosed,user,setFieldValue}) =>{

    
    return(
    <Form>
      <Grid container xs={12} rowSpacing={3} columnSpacing={3} margin={0}>

          <Grid item xs={12} >
            <Field
            fullWidth
            label="Label" 
            placeholder="Enter your label"
            component={TextField}
            onChange={(event) => {
              const uppercasedValue = event.target.value.toUpperCase();
              setFieldValue("name", uppercasedValue);
            }}
            name="name"
            inputProps={{ style: { backgroundColor: "white" } }}
          />
          </Grid>
           <Grid item xs={12} display={"flex"} justifyContent={"end"}>
          <button type="submit"  onClick={OnClickClosed}>
            submit
          </button>
            </Grid>
          </Grid>
        </Form>
        
        );
};


const LabelField = withFormik({
    mapPropsToValues: ({ user }) => ({
      name: "",
      user:user,      
    }),
    validationSchema: Yup.object().shape({
      name: Yup.string().required("required"),
    }),
    handleSubmit: (values, { props, setSubmitting }) => {
       
        setSubmitting(false);
        props.registerByTask(values);
    },
  })(Component);
  
  export default LabelField;

