import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { useContext } from "react";
import { MyContext } from "../App";

const Loader = () => {
  const { isLoaded } = useContext(MyContext);

  return (
    <Backdrop open={!isLoaded} style={{ zIndex: 1999 }}>
      <CircularProgress />
    </Backdrop>
  );
};
export default Loader;
