// react
import React, { Fragment } from "react";
// third party
import "antd/dist/antd.css";
import { Switch, Route } from "react-router-dom";
// custom
import Navbar from "./components/Navbar";
import General from "./components/General";
import Bussiness from "./components/Bussiness";
import Technology from "./components/Technology";
import Sport from "./components/Sport";
import More from "./components/More";

function App() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={General} />
        <Route exact path="/bussiness/" component={Bussiness} />
        <Route exact path="/technology/" component={Technology} />
        <Route exact path="/sports/" component={Sport} />
        <Route exact path="/more/" component={More} />
      </Switch>
    </Fragment>
  );
}

export default App;
