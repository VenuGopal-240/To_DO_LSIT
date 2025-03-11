import React, { useContext, useEffect, useState } from "react";
import { withFormik, Form, Field } from "formik";
import { Select, MenuItem, Button, FormControl, InputLabel, Grid, IconButton, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { createLabel } from "../Util/api";
import Dialog from "../Dialog/Dialog";
import { makeStyles } from "@mui/styles";
import LabelField from "../Dialog/AddLabel";
import { MyContext } from "../App";
import { getLabels } from "../Util/api";
import { TextField } from "formik-mui";
import dayjs from "dayjs";

const MyForm = ({ values, handleChange, setFieldValue, onSave, updateRecord }) => {

    const { user } = useContext(MyContext);

    const classes = useStyles();
    const [isCheckout, setIsCheckout] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        getLabels({ user: user.id }).then((res) => {
            setMenuItems(res);
        });
    }, []);

    const onClickCheckout = () => {
        setIsCheckout(true);
    };

    const onCloseCheckout = () => {
        setIsCheckout(false);
    };

    const OnClickClosed = () => {
        setIsCheckout(false);
    };

    const registerByTask = (value) => {
        createLabel(value)
            .then((res) => {
                sessionStorage.setItem("user", JSON.stringify(res));
                getLabels({ user: user.id }).then((res) => {
                    setMenuItems(res);
                });
                setIsCheckout(false);
            })
            .catch((err) => {
            });

    };
    
    return (
        <Form autoComplete="off">
            <Grid className={classes.mainContainer}>
                <Grid container xs={6} rowSpacing={3} columnSpacing={3} margin={0}>
                    <Grid item xs={12}>
                        <label ><h3>Task</h3></label>
                        <Field
                            label="Add New Task"
                            name="task"
                            value={values.task}
                            onChange={handleChange}
                            fullWidth
                            component={TextField}
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label style={{ paddingRight: "100px" }}>List</label>
                        <Field
                            select
                            // fullWidth
                            name="labelId.id"
                            component={TextField}
                            style={{ width: "25vw" }}
                        >
                            {menuItems?.map((list) => {
                                return (
                                    <MenuItem key={list?.id} value={list?.id}>
                                        {list?.name}
                                    </MenuItem>
                                );
                            })} 
                        </Field>
                        <IconButton onClick={onClickCheckout} className={classes.iconButton}>
                            <AddCircleOutlineIcon />
                        </IconButton>
                        <Dialog
                            open={isCheckout}
                            children={<LabelField OnClickClosed={OnClickClosed} registerByTask={registerByTask} user={user} />}
                            onClose={onCloseCheckout}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <label style={{ paddingRight: "60px" }}>Task Date:</label>
                        <Field
                            name="taskDate"
                            component={DatePicker}
                            format="DD-MM-YYYY"
                            value={values?.taskDate ? dayjs(values?.taskDate) : null}
                            onChange={(taskDate) => setFieldValue('taskDate', taskDate)}
                        />
                    </Grid>
                    <Grid item xs={12} className={classes.spacebetween}>
                        {updateRecord?.id ? <Button type="submit" variant="contained" color="primary">
                            Update
                        </Button> : <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>}
                    </Grid>
                </Grid>
            </Grid>
        </Form>
    );
};

const EnhancedForm = withFormik({
    mapPropsToValues: ({ updateRecord }) => ({
        id: updateRecord?.id || '',
        task: updateRecord?.task || '',
        labelId: { id: updateRecord?.labelId?.id } || '',
        taskDate: updateRecord?.taskDate || ''
    }),
    handleSubmit: (values, { props, setSubmitting,resetForm }) => {
        props.onSave(values);
        setSubmitting(false);
        resetForm();
    },
})(MyForm);

export default EnhancedForm;

const useStyles = makeStyles((theme) => ({
    mainContainer: {
        paddingTop: "2rem",
        paddingBottom: "2rem",
        backgroundImage: `url("Images/createbackground.jpg")`,
        height: "80vh",
        backgroundSize: "100% 100%",
    },
    spacebetween: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    iconButton: {

    },
    btn: {
        border: "none",
        borderRadius: 20,
        padding: "10px 2rem",
        background: "blue",
        color: "white",
        "&:hover": {
            opacity: 0.8,
            background: "red",
        },
    },
}));

// taskDate:  {id: updateRecord?.taskDate ? newFormatted : ''} || '',
// date:{id: updateRecord?.taskDate} ,
// date:null,
// userId: updateRecord.user,