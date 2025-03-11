import React, { useContext } from "react";
import { TextField, Grid, Button, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { Dialog } from "@material-ui/core";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { makeStyles } from "@mui/styles";
import { Form, withFormik } from "formik";
import * as Yup from "yup";
import { getTasks } from "../Util/api";
import dayjs from "dayjs";
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import { MyContext } from "../App";

const DatePickerData = ({ handleSearch, values, setFieldValue }) => {
  const [date, setDate] = useState(new Date());
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setTasks, user } = useContext(MyContext);

  const formattedDate = new Intl.DateTimeFormat('en-in', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);

  const classes = useStyles();

  const onChangeMonthAndYear = (value, name) => {
    setFieldValue(name, value);
    setFieldValue("fromDate", null);
    setFieldValue("toDate", null);
  };

  const onChangeDateRange = (value, name) => {
    setFieldValue(name, value);
    setFieldValue("year", null);
    setFieldValue("month", null);
  };

  const toDateValidation = (date) => {
    return date < values?.fromDate;
  };
  const handleDateChange = (date) => {
    setDate(date);
  };

  const handleDateOperation = () => {
    const newFormatted = date?.format('YYYY-MM-DD');
    setIsDialogOpen(false);
    getTasks({ date: newFormatted, userId: user.id }).then((res) => {
      setTasks(res);
    });
  };
  const handleDialogClose = () => {
    setIsDialogOpen(false);
  }

  return (<>
    <Form autoComplete="off">
      <Grid className={classes.mainContainer}>
        <Grid width={"10vw"} marginLeft={"3rem"}  >
          <h3 onClick={() => setIsDialogOpen(true)}>{formattedDate.toUpperCase()}</h3>
          <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
            <DialogTitle>Select a Date</DialogTitle>
            <DialogContent>

              <StaticDatePicker orientation="landscape"
                selected={date}
                onChange={handleDateChange}
                inline
                componentsProps={{
                  actionBar: {
                    actions: [] // Remove all actions
                  }
                }}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose} color="primary">
                Cancel
              </Button>
              <Button onClick={handleDateOperation} color="primary">
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid className={classes.subManiContainer}>
          <Grid marginRight={"1rem"} width={"10vw"} backgroundColor="white">
            <DatePicker
              name="year"
              onChange={(value) =>
                onChangeMonthAndYear(dayjs(value).format("YYYY"), "year")
              }
              views={["year"]}
              label={" Year"}
              value={values?.year ? dayjs(values?.year) : null}
            />
          </Grid>
          <Grid width={"10vw"} backgroundColor="white">
            <DatePicker
              name="month"
              className={classes?.dateField}
              onChange={(value) =>
                onChangeMonthAndYear(dayjs(value).format("MM"), "month")
              }
              views={["month"]}
              label={" Month"}
              value={values?.month ? dayjs(values?.month) : null}
            />
          </Grid>
        </Grid>

        <Grid className={classes.subManiContainer}>
          <Grid marginRight={"1rem"} width={"10vw"} backgroundColor="white">
            <DatePicker
              className={classes?.dateField}
              name="fromDate"
              label="From Date"
              value={values?.fromDate ? dayjs(values?.fromDate) : null}
              format="DD-MM-YYYY"
              onChange={(value) =>
                onChangeDateRange(dayjs(value).format("YYYY-MM-DD"), "fromDate")
              }
            />
          </Grid>
          <Grid width={"10vw"} backgroundColor="white">
            <DatePicker
              className={classes?.dateField}
              name="toDate"
              label="To Date"
              value={values?.toDate ? dayjs(values?.toDate) : null}
              format="DD-MM-YYYY"
              onChange={(value) =>
                onChangeDateRange(dayjs(value).format("YYYY-MM-DD"), "toDate")
              }
              shouldDisableDate={toDateValidation}
            />
          </Grid>
        </Grid>

        <Grid marginRight={"2rem"}>
          <Button type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Form>
  </>)
}

const DateData = withFormik({
  mapPropsToValues: () => ({
    month: "",
    year: "",
    fromDate: "",
    toDate: "",
  }),
  handleSubmit: (values, { props, setSubmitting ,resetForm}) => {
    const filteredObject = Object.entries(values).reduce(
      (acc, [key, value]) => {
        if (value !== null) {
          acc[key] = value;
        }
        return acc;
      },
      {}
    );
    props.handleSearch(filteredObject);
    setSubmitting(false);
    resetForm();
  },
})(DatePickerData);

export default DateData;
const useStyles = makeStyles((theme) => ({

  mainContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "1rem",
    alignItems: "center",
  },
  subManiContainer: {
    display: "flex",
    flexDirection: "row",
  },

}));