import LoginPage from './LoginPage/LoginPage';
import { HashRouter, Outlet, Navigate, Route, Routes } from 'react-router-dom';
import { createContext, useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Header from './Header/Header';
import TaskBody from './TaskBody/TaskBody';
import CreateTask from './CreateUs/CreateUs';
import Notification from './Notification/Notification';
import Loader from './Loader/Loader';

export const MyContext = createContext("");

const Layout = () => (
  <Header>
    <Outlet />
  </Header>
);

function App() {

  const [user, setUser] = useState(JSON.parse(sessionStorage.getItem("user")));
  const [notifications, setNotifications] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const [selectedMenu, setSelectedMenu] = useState("home");
  const [updateRecord, setUpdateRecord] = useState([]);
  const [tasks, setTasks] = useState([]);

  return (
    <>
      <MyContext.Provider
        value={{
          user,
          setUser,
          isLoaded,
          setIsLoaded,
          selectedMenu,
          setSelectedMenu,
          updateRecord,
          setUpdateRecord,
          notifications,
          setNotifications,
          tasks,
          setTasks,
        }}
      >
        <Notification />
        <Loader />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <HashRouter>
            <Routes>
              <Route index element={<Navigate to="/login" />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<Layout />}>
                <Route index element={<Navigate to="/home/Taskpage" />} />
                <Route path="/home/TaskPage" element={<TaskBody />} />
                <Route path="/home/createPage" element={<CreateTask />} />
              </Route>
            </Routes>
          </HashRouter>   
        </LocalizationProvider>
      </MyContext.Provider>
    </>
  );
}

export default App;
