import React, { useContext } from "react";
import { useNavigate } from "react-router";
import EnhancedForm from "../CreatePage/CreateForm";
import { MyContext } from "../App";
import { createTask, getTasks } from "../Util/api";

const CreateTask = () => {

  const { user, updateRecord, setUpdateRecord, setNotifications, setTasks, setIsLoaded } = useContext(MyContext);

  const navigate = useNavigate();
  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;


  const onSave = (values) => {
    setIsLoaded(false);
    const payLoad = values.id ?{
      id: values.id, status: values.status, createdOn: values.createdOn, task: values.task, taskDate: values.taskDate, favourite: values.favourite,
      labelId: values.labelId,
      userId: {
        id: user.id, status: user.status, createdOn: user.createdOn, mobileNo: user.mobileNo, fullName: user.fullName, email: user.email, username: user.username, password: user.password
      }
    }:{
      status: values.status, createdOn: "", task: values.task, taskDate: values.taskDate, favourite: values.false,
      labelId: values.labelId,
      userId: { id: user.id, status: user.status, createdOn: user.createdOn, mobileNo: user.mobileNo, fullName: user.fullName, email: user.email, username: user.username, password: user.password }
    };
      createTask(payLoad).then((res) => {
        setNotifications([
          {
            message: values.id ?"Task Updated": "TaskCreated",
            severity: "success",
          },
        ]);
        setUpdateRecord([]);
        navigate("/home/TaskPage");
        getTasks({ date: formattedDate, userId: user.id }).then((res) => {
          setTasks(res);
        });
        removeNotification();
        setIsLoaded(true);
      })
        .catch((_) => {
          setNotifications([
            {
              message: values.id ? "Task Updated Failed": "Task Creation Failed",
              severity: "success",
            },
          ]);
        });
      setIsLoaded(true);
      removeNotification();    
  };

  const removeNotification = () => {
    setTimeout(() => {
      setNotifications([]);
    }, 1000);
  };

  return (
    <>
      <EnhancedForm onSave={onSave} user={user} updateRecord={updateRecord}  />
    </>
  );
};

export default CreateTask;