import React, { useContext, useState } from 'react';
import { IconButton, MenuItem, Menu,} from "@mui/material";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { MyContext } from '../App';
import { createTask } from '../Util/api';
import { useNavigate } from 'react-router';
import { getTasks } from '../Util/api';


const DropdownMenu = ({ status }) => {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const { user, setUpdateRecord, setTasks, tasks, setNotifications } = useContext(MyContext);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteTask = (obj) => {
    const payLoad = {
      id: status.id, createdOn: status.createdOn, favourite: status.favourite,
      status: "Deleted", task: status.task, taskDate: status.taskDate, labelId: status.labelId, userId: status.userId,
    };
    createTask(payLoad)
      .then((res) => {
        navigate("/home/TaskPage")
        setNotifications([
          {
            message: "Task Deleted",
            severity: "success",
          },
        ]);
        getTasks({ date: formattedDate, userId: user.id }).then((res) => {
          setTasks(res);
        });
        removeNotification();
      })
      .catch((err) => {
        setNotifications([
          {
            message: "Task Deleted Failed",
            severity: "success",
          },
        ]);
      });
  }

  const createTaskPage = () => {
    setUpdateRecord({ ...status });
    navigate("/home/createPage");
    getTasks({ date: formattedDate, userId: user.id }).then((res) => {
      setTasks(res);
    });
  }

  const removeNotification = () => {
    setTimeout(() => {
      setNotifications([]);
    }, 1000);
  };

  return (
    <>
      <IconButton color="primary" onClick={handleClick}>
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={deleteTask}>Delete</MenuItem>
        <MenuItem onClick={createTaskPage}>Update</MenuItem>
      </Menu>
    </>
  );
};

export default DropdownMenu;