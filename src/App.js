import React from "react";
import "./App.css";
import Signup from "./Components/Signup";
import { AuthContext } from "./contexts/AuthContext";
import MainPage from "./Components/MainPage";
import Login from "./Components/Login";
import Channel from "./Components/Channel";
import ForgotPassword from "./Components/ForgotPassword";
import PrivateRoute from "./Components/PrivateRoute";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthContext>
          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <PrivateRoute path="/home" component={MainPage} />
            <Route path="/signup" component={Signup} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <PrivateRoute path="/channel/:id" component={Channel} />
          </Switch>
        </AuthContext>
      </Router>
    </div>
  );
}

export default App;
