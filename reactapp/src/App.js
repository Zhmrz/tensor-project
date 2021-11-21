import './App.css';
import {AppBar,
  IconButton,
  Menu,
  Toolbar,
  Typography,
  Box,
  Paper,
  Button,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions} from "@mui/material";
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginIcon from '@mui/icons-material/Login';
import styled from 'styled-components';
import {useState} from "react";
import {Route, Routes, NavLink} from "react-router-dom";
import Main from "./pages/Main";
import Help from "./pages/Help";
import OwnPage from "./pages/OwnPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";

const AppWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: repeat(12, 1fr);
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
    padding: 64px 0;
`

const BarWrapper = styled.div`
    position: fixed;
    top: ${props => props.top ? 0 : 'none'};
    bottom: ${props => props.bottom ? 0 : 'none'};
    left: 0;
    right: 0;
    background-color: #61dafb;
    height: 64px;
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-column-gap: 10px;
`

const RightBar = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
`

const ToolbarWrapper = styled.div`
    grid-column: 2 / span 10;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
`

const PageWrapper = styled.div`
    grid-row: 1 / span 12;
    grid-column: 2 / span 10;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
`

function App() {
    const [login, setLogin] = useState(false);
    const [userActive, setUserActive] = useState(true);
    return (
      <AppWrapper>
        <BarWrapper top>
          <ToolbarWrapper>
            <NavLink to="/">
              <HomeWorkIcon sx={{fontSize: '34px', color: 'white'}}/>
            </NavLink>
            <RightBar>
              {userActive ?
                  <>
                    <NavLink to="/search">
                      <SearchIcon sx={{fontSize: '34px', color: 'white', ml: '20px'}}/>
                    </NavLink>
                    <NavLink to="/user">
                      <AccountCircle sx={{fontSize: '34px', color: 'white', ml: '20px'}}/>
                    </NavLink>
                  </>
                  : <></>
              }
              <NavLink to="/help">
                <HelpOutlineIcon sx={{fontSize: '34px', color: 'white', ml: '20px'}}/>
              </NavLink>
            </RightBar>
          </ToolbarWrapper>
        </BarWrapper>
        <PageWrapper>
          <Routes>
            <Route exact path="/" element={<Main />}/>
            <Route exact path="/help" element={<Help />}/>
            <Route exact path="/user" element={<OwnPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route exact path="/search" element={<SearchPage />} />
            <Route path="*" element={<NotFound />}/>
          </Routes>
        </PageWrapper>
        <BarWrapper bottom>
          <Box sx={{gridColumn: '2 / span 10', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Typography align='center' sx={{fontSize: '18px', color: 'white'}}>© 2021 FreeStylooo United Group. Все права защищены.</Typography>
          </Box>
        </BarWrapper>
      </AppWrapper>
    );
}

export default App;