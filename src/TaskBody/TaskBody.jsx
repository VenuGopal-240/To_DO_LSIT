import React, { useContext, useEffect, useState } from "react";
import {  IconButton, Menu, MenuItem, TextField, Grid, InputAdornment } from "@mui/material";
import { MyContext } from "../App";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import SearchIcon from '@mui/icons-material/Search';
import { makeStyles } from "@mui/styles";
import { createTask, getTasks } from "../Util/api";
import Table from "../Table/Table";
import { tableColumns } from "../Util/tableConstants";
import SwapVertIcon from '@mui/icons-material/SwapVert';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DateData from "../DatePickers/DatePicker";

const TaskBody = () => {
  const { setselectedMenu, user, setUpdateRecord, tasks, setTasks, setNotifications } = useContext(MyContext);

  const [anchorElSort, setAnchorElSort] = useState(null);
  const [anchorElFilter, setAnchorElFilter] = useState(null);
  const [alphabetical, setAlphabetical] = useState(true);
  const [sortTime,setSortTime] = useState(true);

  const [data, setData] = useState([]);
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;

  const handleFilterFavorite = () => {
  const favorite = data?.filter((obj) => obj?.favourite === true)
    setTasks(favorite);
    setAnchorElFilter(null);
  };

  const handleFilterAll = () => {
    setTasks(data);
    setAnchorElFilter(null);
  }

  const handleFilterDone = () => {
    const done = data?.filter((obj) => obj?.status === "Done")
    setTasks(done);
    setAnchorElFilter(null);
  }

  const handleFilterDelete = () => {
    const deleteData = data?.filter((obj) => obj?.status === "Deleted")
    setTasks(deleteData);
    setAnchorElFilter(null);
  }

  useEffect(() => {
    getTasks({ date: formattedDate, userId: user.id }).then((res) => {
      setTasks(res);
      setData(res);
    });
    setUpdateRecord([]);
  }, []);

  const handleSortClick = (event) => {
    setAnchorElSort(event.currentTarget);
  };

  const handleFilterClick = (event) => {
    setAnchorElFilter(event.currentTarget);
  };

  const handleFilterClose = () => {
    setAnchorElFilter(null);
  };

  const handleSearch = (value) => {
    if (value.month || value.toDate || value.fromDate || value.year) {
      getTasks({ month: value.month, year: value.year, fromDate: value.fromDate, toDate: value.toDate, userId: user.id }).then((res) => {
        setTasks(res);
        setData(res);
      });
    }
    else {
      getTasks({ userId: user.id }).then((res) => {
        setTasks(res);
        setData(res);
      });
    }
    setUpdateRecord([]);
  };

  const onClickToFavourite = (obj) => {    
    const payLoad = {
      id: obj.id, createdOn: obj.createdOn, favourite: !(obj.favourite),
      status: obj.status, task: obj.task, taskDate: obj.taskDate, labelId: obj.labelId, userId: obj.userId,
    };    
    createTask(payLoad)
      .then((res) => {
        setNotifications([
          {
            message: obj.favourite ? "Favourite Remove":"Add To Favorite",
            severity: "success",
          },
        ]);
        removeNotification();
        setTasks([]);
      })
      .catch((err) => {
        setNotifications([
          {
            message: obj.favorite ? "Failed To Favourite Remove":"Failed To Add To Favorite",
            severity: "success",
          },
        ]);
        removeNotification();
      });
  }

  const onClickCheckBox = (obj) => {
    const payLoad = {
      id: obj.id, createdOn: obj.createdOn, favourite: obj.favourite,
      status: "Done", task: obj.task, taskDate: obj.taskDate, labelId: obj.labelId, userId: obj.userId,
    };
    createTask(payLoad)
      .then((res) => {
        setNotifications([
          {
            message: "UpDated",
            severity: "success",
          },
        ]);
        removeNotification();
        setTasks([]);
      })
      .catch((err) => {
        setNotifications([
          {
            message: "UpDated Failed",
            severity: "success",
          },
        ]);
      });
  }

  const handleSortAtoZ = () => {
    const sortedData = [...data].sort((a, b) => {
      const nameA = a.task ? a.task.toLowerCase() : "";
      const nameB = b.task ? b.task.toLowerCase() : "";
      return alphabetical ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    });
    setAlphabetical(!alphabetical);
    setTasks(sortedData);
    setAnchorElSort(null);
  }

  const onSearch = (event) => {
    setTasks(data.filter((item) => item?.task?.toLowerCase().includes(event.target.value)))
  }

  const handleSortTime = () => {    
      const sortedData = [...data].sort((a, b) => {
          const timeA = new Date(a.taskDate);
          const timeB = new Date(b.taskDate);
          return sortTime?  timeA - timeB: timeB-timeA;
      });
      setTasks(sortedData);
      setSortTime(!sortTime);
      setAnchorElSort(null);
  };

  const removeNotification = () => {
    setTimeout(() => {
      setNotifications([]);
    }, 1000);
  };

  const handleSortClose = () => {
    setAnchorElSort(null);
  };

  const classes = useStyles();

  return (
    <Grid className={classes.img} >

      <DateData handleSearch={handleSearch} />

      <Grid display={"flex"} justifyContent={"space-between"} >
        <Grid display={"flex"} flexDirection={"row"} paddingLeft={"4rem"} paddingTop={"4rem"}>
          <Grid paddingRight={"3rem"} border={"1px solid black"} padding={"1rem"} backgroundColor={"white"}>
            SORT BY
            <IconButton onClick={handleSortClick}>
              <FormatListBulletedIcon color="primary" />
            </IconButton>
            <Menu
              anchorEl={anchorElSort}
              open={Boolean(anchorElSort)}
              onClose={handleSortClose}
            >

              <MenuItem onClick={handleSortAtoZ}> <SwapVertIcon color="primary" />A-Z </MenuItem>
              <MenuItem onClick={handleSortTime}> <HourglassEmptyIcon color="success" />Time</MenuItem>
            </Menu>
          </Grid>

          <Grid marginLeft={"3rem"} border={"1px solid black"} padding={"1rem"} backgroundColor={"white"}>
            FILTER BY
            <IconButton onClick={handleFilterClick}>
              <FormatListBulletedIcon color="primary" />
            </IconButton>
            <Menu
              anchorEl={anchorElFilter}
              open={Boolean(anchorElFilter)}
              onClose={handleFilterClose}
            >
              <MenuItem onClick={handleFilterAll}><FormatListBulletedIcon />ALL</MenuItem>
              <MenuItem onClick={handleFilterFavorite}><FavoriteBorderIcon />FAVORITE</MenuItem>
              <MenuItem onClick={handleFilterDone}><CheckCircleOutlineIcon color="primary" />DONE</MenuItem>
              <MenuItem onClick={handleFilterDelete}><DeleteOutlineIcon color="red" />DELETE</MenuItem>
            </Menu>
          </Grid>
        </Grid >

        <Grid paddingTop={"4rem"} paddingRight={"4rem"}>
          <TextField
            style={{ backgroundColor: "white" }}
            size="small"
            variant="outlined"
            placeholder="Search to-do list"
            onChange={onSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
      <Grid style={{ height: "40vh", overflow: "auto" }} marginTop={"2rem"}>
        <Table className={classes.flex}
          columns={tableColumns(onClickToFavourite, onClickCheckBox)}
          data={tasks}
          sticky={true}
        />
      </Grid>
    </Grid>
  );
};

export default TaskBody;

const useStyles = makeStyles((theme) => ({
  img: {
    paddingTop: "1rem",
    paddingBottom: "2rem",
    backgroundImage: `url("Images/main.jpg")`,
    backgroundColor: "lightyellow",
    height: "80vh",
    backgroundSize: "100% 100%",
  },
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


