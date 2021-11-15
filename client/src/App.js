import logo from './logo.svg';
import './App.css';
import Login from "./components/Login/Login";
import UsernamePasswordForm from "./components/Login/UsernamePasswordForm/UsernamePasswordForm";
import {
    BrowserRouter as Router, Route, Routes
} from "react-router-dom";

function App() {
  return (
          <div className="App">
              <header className="App-header">
                  <Routes>
                      <Route path="/" element={<Login/>}>
                          <Route path=":flowId" element={<UsernamePasswordForm/>}></Route>
                      </Route>

                  </Routes>


              </header>
          </div>

  );
}

export default App;
