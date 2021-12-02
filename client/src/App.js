import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login";
import UsernamePasswordForm from "./components/Login/UsernamePasswordForm/UsernamePasswordForm";
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";
import OAuth from "./components/Login/OAuth/OAuth";
import Auth0 from "./components/Login/Auth0/Auth0";
import JWT from "./components/Login/JWT/JWT";
import OpenIdConnect from "./components/Login/OpenIdConnect/OpenIdConnect";
import Header from "./components/Header/Header";
import {makeStyles} from "@mui/material";
// import {AuthDataProvider} from "./components/Login/AuthDataProvider"



function App() {
  return (


          // <div className="App">
        <div>
              <Router>
                  {/*<header className="App-header">*/}
                  <header>
                      <Header/>
                      <Routes>
                          <Route
                              exact path="/"
                              element={<Login/>}
                          ></Route>
                          <Route exact path="/auth/1" element={<UsernamePasswordForm/>}></Route>
                          <Route exact path="/auth/2" element={<OAuth/>}></Route>
                          <Route exact path="/auth/3" element={<OpenIdConnect/>}></Route>
                          <Route exact path="/auth/4" element={<JWT/>}></Route>
                          <Route exact path="/auth/5" element={<Auth0/>}></Route>

                      </Routes>
                  </header>
              </Router>
          </div>

  );
}

export default App;
