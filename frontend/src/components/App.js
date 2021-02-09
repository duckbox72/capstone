import React, { useEffect, useState }from "react";
import { Redirect, Route, Switch, } from "react-router-dom";
import { createMuiTheme, makeStyles, ThemeProvider } from "@material-ui/core/styles"
import { Paper } from "@material-ui/core"
import ContactPage from "./ContactPage"; 
import CollectionPage from "./CollectionPage";
import Home from "./Home";
import Navbar from "./Navbar";
import SignIn from "./Signin";
import SignUp from "./Signup";
import Landing from "./Landing";


const useStyles = makeStyles({
    appStyles: {
        dysplay: "flex"
    }
})

export default function App(props) {
    
    const classes = useStyles();
    const [darkMode, setDarkMode] = useState(false);
    
    const [isAuthenticated, updateIsAuthenticated] = useState(props.isAuthenticated);
    const [userProfile, setUserProfile] = useState("")
    
    console.log(isAuthenticated) // -------------------------- TO BE REMOVED
    console.log(userProfile) 

    

    function getUserProfile() {
        fetch('/api/user_profile')
        .then(response => response.json())
        .then(data => {
            console.log(`GET PROF LOG -- >> ${data}`)
            setUserProfile(data.username)
        });
    }

    useEffect(() => {
        getUserProfile();
    })


    const mytheme = createMuiTheme({
        palette: {
            primary:{
                light: '#ffd95b',
                main: '#ffa726',
                dark: '#c77800',
                contrastText: '#3e2723',
            },
            secondary:{
                light: '#7b5e57',
                main: '#4e342e',
                dark: '#260e04',
                contrastText: '#fff3e0',
            },
            type: darkMode ? "dark" : "light",
            },
            background: {
                default: '#fff',
            }
        
    });

    function handleCallback() {
        setDarkMode(!darkMode);
    }

    function signInCallback(status) {
        updateIsAuthenticated(status);
        getUserProfile(); 
    }


    return (
        <ThemeProvider theme={mytheme}>
            <Paper style={{ height: "100vh", borderRadius: "0px" }}>
                <div classeName={classes.appStyles}>
                    {isAuthenticated ? 
                    (
                    <Navbar 
                        darkMode="darkMode" 
                        userProfile={userProfile}
                        parentCallback={handleCallback}
                    />
                    ) : (
                        <></>
                    )} 
                    <Switch>
                        {isAuthenticated ? 
                        (<>
                            <Route exact path="/" render={props => <Home {...props} />} />
                            <Route path='/signin' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signup' render={props => <Redirect {...props} to="/" />} />
                            <Route path='/signout' render={props => <SignOut {...props} />} />
                        </>)
                        : 
                        (<>
                            <Route exact path='/' render={props => <Landing {...props} />} />
                            <Route path='/signin' render={props => <SignIn parentCallback={signInCallback} {...props} />} />
                            <Route path='/signup' render={props => <SignUp parentCallback={signInCallback} {...props} />} />
                        </>)
                        }
                        <Route path='/contact' component={ContactPage} />
                        <Route path='/collection' component={CollectionPage} />
                             
                    </Switch>

                </div> 
            </Paper>
        </ThemeProvider>
    );
}
