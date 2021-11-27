import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from "react-router-dom";
import './styles/index.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import App from './App';
import {Provider} from "react-redux";
import store from './store/store';

let theme = createTheme({
    palette: {
        primary: {
            main: '#32384D',
            contrastText: '#FFF'
        },
        secondary: {
            main: '#E29930',
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
      <Provider store={store}>
          <Router>
              <ThemeProvider theme={theme}>
                <App />
              </ThemeProvider>
          </Router>
      </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
