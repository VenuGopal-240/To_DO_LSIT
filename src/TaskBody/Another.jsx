import { Grid, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import React from "react";



const Task = () =>{

    return(
        <>
            <Grid display={"flex"} flexDirection={"row"}>
                <Grid  marginLeft={"5rem"} width={"10vw"} >
                <DatePicker 
              label="From Date"
            //   value={fromDate}
            //   onChange={(newValue) => setFromDate(newValue)}
            //   renderInput={(params) => <TextField {...params} fullWidth />}
            />
                </Grid>
                <Grid marginLeft={"15rem"}>Two</Grid>
            </Grid>
            
        </>
    )
}

export default Task;