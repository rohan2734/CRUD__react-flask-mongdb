import React from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";

import Login from "./Components/Login";
import logo from "./Assets/logo.png";
import bg from "./Assets/background.svg";
import Signup from "./Components/Signup";
import Mainsection from "./Components/Mainsection";

function App() {
  return (
    <Router>
      <div className="container">
        <img src={logo} className="logo" />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Signup} />
          <Route exact path="/forms" component={Mainsection}/>
        </Switch>
        {/* <Mainsection /> */}
      </div>
    </Router>
  );
}

export default App;
