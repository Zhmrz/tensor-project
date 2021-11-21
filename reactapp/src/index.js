import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';

let theme = createTheme({
    palette: {
        primary: {
            main: '#0052cc',
        },
        secondary: {
            main: '#edf2ff',
        },
    },
    typography: {
        fontFamily: 'Yanone Kaffeesatz, sans-serif;',
        fontSize: '24px',
        fontWeight: 'normal',
    }
});


ReactDOM.render(
  <React.StrictMode>
      <Router>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
      </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
