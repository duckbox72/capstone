import React, { useState } from 'react';
import { AppBar, Avatar, IconButton, Toolbar, Tooltip, Typography} from '@material-ui/core';
import BrightnessMediumIcon from '@material-ui/icons/BrightnessMedium';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import { makeStyles } from '@material-ui/styles';
import { grey }  from '@material-ui/core/colors';



const Navbar = (props) => {
    const useStyles = makeStyles((theme) => ({
        appbar: {
            backgroundColor: navbarDarkMode ? grey[200] : grey[800],
        },
        appbar_img: {
            height: "60px",
            [theme.breakpoints.down("sm")]: {
                height: "50px",
            },
        },
        appbar_typography: {
            flex: 1,
        },
        avatar: {
            width: theme.spacing(3),
            height: theme.spacing(3),
            backgroundColor: navbarDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
        },
        iconButton: {
            color: navbarDarkMode ? theme.palette.secondary.main : theme.palette.primary.main,
        },
    }));
    
    const [navbarDarkMode, setNavbarDarkMode] = useState(props.darkMode);
    
    const handleSignOutButton = () => {
        fetch('/api/signout')
        .then(response => response.json())
        .then(data => {
          console.log(data)
          if (data.success) {
            console.log(data.success);
            props.parentSignOutCallback()
            props.history.push('/') 
          } else {
            alert("Bad Request, please try again.")
          }
        });
      };
    
    const toggleDarKMode = () => {
        props.parentDarkModeCallback()
        setNavbarDarkMode(!navbarDarkMode);
    }

    const userProfile = props.userProfile;
    const classes = useStyles();

    return (
        <AppBar position="static" color="default" elevation={0} className={classes.appbar}>
            <Toolbar className={classes.toolbarStyles}>
                <img src={navbarDarkMode ? "/static/images/banner_light.png" : "/static/images/banner_dark.png"} alt="logo" className={classes.appbar_img}></img>
                <Typography className={classes.appbar_typography} /> 
                <Tooltip title="Toggle light/dark mode">
                    <IconButton aria-label="toggleDarkMode" onClick={toggleDarKMode}>
                        <BrightnessMediumIcon className={classes.iconButton} />
                    </IconButton>
                </Tooltip>
                <Tooltip title={userProfile.username}>
                    <IconButton aria-label="username">
                        <Avatar className={classes.avatar}>{userProfile.username[0]}</Avatar>
                    </IconButton>
                </Tooltip>
                <Tooltip title="Sign out">
                    <IconButton aria-label="signout" onClick={handleSignOutButton}>
                        <ExitToAppIcon className={classes.iconButton} />
                    </IconButton>                  
                </Tooltip>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;