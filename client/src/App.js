import React from 'react';
import './App.css';
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";

import { Cytomine } from "cytomine-client"
import { Auth, Project, Projects, Root, Viewer } from "./components";
import { PrivateRouter } from "./util";

function App() {
  new Cytomine(process.env.REACT_APP_REMOTE_SERVER);
  
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Root} />
        <Route path="/auth" component={Auth} />
        <PrivateRouter path="/project" component={Project} />
        <PrivateRouter path="/projects" component={Projects} />
        <PrivateRouter path="/viewer" component={Viewer} />
      </Switch>
    </Router>
  );
}

export default App;
