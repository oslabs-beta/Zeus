import React, {useContext} from 'react'
import { Typography, Box} from '@mui/material';

import {Context} from "../Context";


type HeaderProps = {
    title: string;
    subtitle: string
}

// this component is reuseable for all containers, and can pass in desired props
// for title and subtitle
function Header({title, subtitle}: HeaderProps) {

    const { darkModeOn } = useContext(Context);
    const fontColor = darkModeOn ? "#fab700 !important" : "black !important" 
    // sets the font color of the header -> changes here get reflected throughout
    // alt light color 344966 fab700

    return (

      <Box mb="30px">

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ m: "0 0 5px 0", textAlign: "left", color: fontColor}}
        >
          {title}
        </Typography>

        <Typography 
            variant="h6" 
            sx={{ textAlign: "left", color: fontColor }}
        >
          {subtitle}
        </Typography>

      </Box>

    );
  };

  export default Header;