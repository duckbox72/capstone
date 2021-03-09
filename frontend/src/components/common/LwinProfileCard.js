import React, { useState } from 'react';
import clsx from 'clsx';

import { Avatar, Card, CardActions, CardContent, CardHeader, Collapse, Divider, Grid, Icon, IconButton, Tooltip, Typography } from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import InvertColorsIcon from '@material-ui/icons/InvertColors';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import LocationCityOutlinedIcon from '@material-ui/icons/LocationCityOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import amber from '@material-ui/core/colors/amber';
import brown from '@material-ui/core/colors/brown';


export default function LwinProfileCard(props) {
    
    const useStyles = makeStyles((theme) => ({
        avatar: {
            backgroundColor: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
            width: theme.spacing(3),
            height: theme.spacing(3),
        },
        avatar_icon: {
            
        },
        card: {
            margin: theme.spacing(0, 3),
            borderRadius: 15,
            backgroundColor: props.darkMode ? brown[600] : amber[50],
        },
        container_actions: {
            padding: theme.spacing(1,2),
        },
        container_collapse: {
            padding: theme.spacing(1,2),
        },
        content_icon: {
            textAlign: "center",
        },
        content_info: {
            textAlign: "right",
        },
        content_label: {
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        divider: {
            margin: theme.spacing(0, 1),
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
              duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },        
        header: {
            backgroundColor: props.darkMode ? brown[600] : amber[50],   
        },
        header_title: {
            fontWeight: 500,
                         
        },
        header_subheader: {
    
        },
        icon: { 
            color: props.darkMode ? theme.palette.primary.main : theme.palette.secondary.main,
        },
        iconbutton_wslogo: {
            height: theme.spacing(6),
            width: theme.spacing(6)
            
        },
        avatar_wslogo: {
            backgroundImage: "url(/static/images/ws-logo-nobg.png)",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }
    }));

    
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    
    const classes = useStyles();
    const LwinData = props.LwinData;
    

    return (
        <Card className={classes.card}>
            <CardHeader
            disableTypography={true}
            className={classes.header}
            avatar={
                <Avatar className={classes.avatar} aria-label="">
                   <InfoOutlinedIcon className={classes.avatar_icon} />
                </Avatar>
            }
            action={
                <Tooltip title="Find in Wine-Searcher">              
                    <IconButton
                    className={classes.iconbutton_wslogo}
                    onClick={() => {console.log('CLICK!')}}
                    aria-label="find in wine-searcher"
                    >
                        <Avatar className={classes.avatar_wslogo}>
                            <Typography></Typography>
                        </Avatar>
                    </IconButton>
                </Tooltip>
            }
            title={
                <Typography variant="body2" className={classes.header_title}>
                   {LwinData.display_name}
                </Typography>
            }
            subheader={
                <Typography variant="body2" color="textSecondary" className={classes.header_subheader}>
                   {LwinData.region + ", " + LwinData.country}
                </Typography>
            }
            />
            
            <Divider className={classes.divider} />

            <Grid container spacing={1} className={classes.container_actions} alignItems="center">
                <IconButton className={classes.iconbutton_wslogo}>
                    <AddIcon />
                </IconButton>
                <IconButton >
                    <ShareIcon />
                </IconButton>
                <IconButton>
                    <FavoriteIcon />
                </IconButton>
                <IconButton
                className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="add to cellar"
                >
                    <AddIcon />
                </IconButton>
            </Grid>
            
            <Divider className={classes.divider} />

            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <Grid container className={classes.container_collapse} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LocationCityOutlinedIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
                            Producer
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.producer_title === "nan" ? "" : LwinData.producer_title} {LwinData.producer_name}
                        </Typography>
                    </Grid>       
                </Grid> 
        
                <Grid container className={classes.container} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <LocationOnOutlinedIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
                            Origin
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.region}, {LwinData.country}
                        </Typography>
                    </Grid>       
                </Grid> 
        
                <Grid container className={classes.container} spacing={0} alignItems="center">
                    <Grid item xs={1} className={classes.content_icon}>
                        <InvertColorsIcon className={classes.icon} fontSize="small" />
                    </Grid>       
                    <Grid item xs={2}>
                        <Typography variant="caption" className={classes.content_label}>
                            Color
                        </Typography >
                    </Grid>
                    <Grid item xs={9} className={classes.content_info}>
                        <Typography variant="body2" >
                            {LwinData.colour}
                        </Typography>
                    </Grid>       
                </Grid> 
            </Collapse>
        </Card>
    );
}