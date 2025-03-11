import { Grid,IconButton,MenuItem,Typography } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { pink } from "@mui/material/colors";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DropdownMenu from "../DropDown/DropDown";

export const tableColumns = (onClickToFavourite,onClickCheckBox)=>[
    {id:"s.NO",label:"S.No", renderer: (_,index) => index+1},
    {
        id: "checkBox",
        label: "Box",
        renderer: (obj) => (
         obj.status===null||obj.status===true?<IconButton onClick={()=>{onClickCheckBox(obj)}}>
          <Checkbox/>
          </IconButton>:<CheckBoxIcon/>
        ),
      },
      {
        id: "favorite",
        label: "favorite",
        renderer: (obj) => (
          obj.favourite===null || obj.favourite===false ?
          <IconButton sx={{ color: pink[500] }} onClick={()=>{onClickToFavourite(obj)}}>
            <FavoriteBorderIcon/>
          </IconButton>:
          <IconButton sx={{ color: pink[500] }} onClick={()=>{onClickToFavourite(obj)}}>
          <FavoriteIcon/>
        </IconButton>

        ),
      },
    { id: "task",  label: "task",},
    { id: "labelName", label: "labelName", renderer: (obj) =>obj.labelId?.name  },
    { id: "status",  label: "status",
    
  }, 
  {id:"taskDate", label:"taskDate",},
    { id: "deleteUpdate", label: "labelName", renderer: (obj) => (
      
        obj.status===null?        
        <IconButton color="primary"  >
          <DropdownMenu status={obj} />
        </IconButton>:
        <IconButton color="primary">
        <MoreHorizIcon />
      </IconButton>

      ),  }


];




