import React from "react";
import createStore from "./store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Wrapper from "./components/Wrapper";
import NowWhat from "./components/NowWhat";
import Map from "./components/Map";
import Chart from "./components/Chart"
import 'mapbox-gl/dist/mapbox-gl.css';
import {HashRouter, Switch, Route} from 'react-router-dom';

const store = createStore();
const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: {
      main: "rgb(39,49,66)"
    },
    secondary: {
      main: "rgb(197,208,222)"
    },
    background: {
      main: "rgb(226,231,238)"
    }
  }
});

const App = props => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <HashRouter>
        <Wrapper>
          <Header />
          <Switch>
            <Route path="/map" component = {Map}/>
            <Route path="/chart" component = {Chart}/>
            <Route component={NowWhat} />
          </Switch>
          <ToastContainer />
        </Wrapper>
      </HashRouter>
    </Provider>
  </MuiThemeProvider>
);

export default App;
