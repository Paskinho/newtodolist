import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles'
import {createTheme} from "@mui/material";
import {amber, green} from "@mui/material/colors";
import {dark} from "@mui/material/styles/createPalette";



const theme = createTheme({
    palette: {
        primary: green,
        secondary: amber,
        type: "dark"
    },
}

)


ReactDOM.render(
    <ThemeProvider>
    <App />
    </ThemeProvider>
    ,  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
