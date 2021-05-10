import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './css/App.css';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ResetPassword from './pages/ResetPassword';

// Redux
import { useDispatch } from 'react-redux';
import { Actions } from './redux/types';
import { setAuth, getUserData } from './redux/actions/userActions';

// MUI stuff
import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'; 


const theme = createMuiTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif'
  },
  palette: {
    primary: {
      light: '#66B2B7',
      main: '#00393D',
      dark: '#001011',
      contrastText: '#fff'
    },
    secondary: {
      light: '#ffa726',
      main: '#fb8c00',
      dark: '#e65100',
      contrastText: '#fff'
    }
  }
});


function App() {
  const dispatch = useDispatch();
  const [token, setToken] = useState(localStorage.getItem('idToken'));

  useEffect(() => {
    if (token) {
      const decodedToken = token.split(" ")[1];

      if (decodedToken.exp * 1000 < Date.now()) {
        // store.dispatch(logoutUser());
        window.location.href = "/login";
        setToken(undefined);
      } else {
        dispatch(getUserData(decodedToken));
      }
    } else {
      setToken(undefined);
    }
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path="/" component = {Home}/>
          <Route exact path="/login" component = {Login}/>
          <Route exact path="/signup" component = {Signup}/>
          <Route exact path="/resetPassword" component = {ResetPassword}/>
        </Switch>
      </Router>
    </MuiThemeProvider>
  );
}

export default App;
