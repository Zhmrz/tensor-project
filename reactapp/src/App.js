import './App.css';
import {useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import styled from 'styled-components';
import {Route, Routes, NavLink} from "react-router-dom";
import Main from "./pages/Main";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SearchPage from "./pages/SearchPage";
import UserPage from "./pages/UserPage";
import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getMe, resetUserData} from "./store/userReducer";
import {Box} from "@mui/material";

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
    background-color: #32384D;
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
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(10, 1fr);
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    margin: 20px 0;
`

function App() {
    const dispatch = useDispatch()
    const token = localStorage.getItem('token')
    useEffect(() => {
        if(token){
            dispatch(getMe(token))
        }
    }, [])
    const id = useSelector(state => state.user.me.id)
    console.log("App"+id)
    console.log(useSelector(state => state.user.me))
    const type = useSelector(state => state.user.me.user_type)
    const isLoading = useSelector(state => state.user.status.isLoading)
    const successAuth = useSelector(state => state.user.status.successAuth)
    const logout = () => {
        dispatch(resetUserData())
        localStorage.removeItem('token')
    }



    return (
      <AppWrapper>
          {isLoading ?
              <Box sx={{display: "flex", justifyContent: 'center', alignItems: 'center'}}>
                  <CircularProgress color={"primary.main"}/>
              </Box>
          :
              <>
                  <BarWrapper top>
                      <ToolbarWrapper>
                          <NavLink to="/" style={({ isActive }) => ({
                              color: isActive ? "#E29930" : "#ffffff"
                          })}>
                              <HomeWorkIcon sx={{fontSize: '34px', color: 'inherit'}}/>
                          </NavLink>
                          <RightBar>
                              {successAuth ?
                                  <>
                                      <NavLink to="/search" style={({ isActive }) => ({
                                          color: isActive ? "#E29930" : "#ffffff"
                                      })}>
                                          <SearchIcon sx={{fontSize: '34px', color: 'inherit', ml: '20px'}}/>
                                      </NavLink>
                                      <NavLink to={(type? '/company/' : '/freelancer/') + id} style={({ isActive }) => ({
                                          color: isActive ? "#E29930" : "#ffffff"
                                      })}>
                                          <AccountCircle sx={{fontSize: '34px', color: 'inherit', ml: '20px'}}/>
                                      </NavLink>
                                      <NavLink to="/login" onClick={() => logout()} style={({ isActive }) => ({
                                          color: isActive ? "#E29930" : "#ffffff"
                                      })}>
                                          <LogoutIcon sx={{fontSize: '34px', color: 'inherit', ml: '20px'}}/>
                                      </NavLink>
                                  </>
                                  : <NavLink to="/login" style={({ isActive }) => ({
                                      color: isActive ? "#E29930" : "#ffffff"
                                  })}>
                                      <LoginIcon sx={{fontSize: '34px', color: 'inherit', ml: '20px'}}/>
                                  </NavLink>

                              }
                              <NavLink to="/help" style={({ isActive }) => ({
                                  color: isActive ? "#E29930" : "#ffffff"
                              })}>
                                  <HelpOutlineIcon sx={{fontSize: '34px', color: 'inherit', ml: '20px'}}/>
                              </NavLink>
                          </RightBar>
                      </ToolbarWrapper>
                  </BarWrapper>
                  <PageWrapper>
                  <Routes>
                  <Route exact path="/" element={<Main />}/>
                  <Route exact path="/help" element={<Help />}/>
                  <Route path="/login" element={!successAuth ? <LoginPage />  : <Navigate to={(type ? '/company/' : '/freelancer/') + id} replace={true}/>}/>
                  <Route path="/freelancer/:id" element={successAuth ? <UserPage type={0}/> : <Navigate to="/login" replace={true}/>} />
                  <Route path="/company/:id" element={successAuth ? <UserPage type={1}/> : <Navigate to="/login" replace={true}/>} />
                  <Route path="/search" element={successAuth ? <SearchPage /> : <Navigate to="/login" replace={true}/>} />
                  <Route path="*" element={<NotFound />}/>
                  </Routes>
                  </PageWrapper>
              </>
          }
      </AppWrapper>
    );
}

export default App;
