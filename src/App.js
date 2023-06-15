
import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Users from '../src/screens/RegistrationForm'
import MainLayout from "../src/layouts/MainLayout/index.js";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          {/* add routes with layouts */}
          <Route path="/" component={MainLayout} />
          {/* add routes without layouts */}
          <Route path="/users" exact component={Users} />
          {/* add redirect for first page */}
          <Redirect from="*" to="/" />
        </Switch>
      </Router>
    </div>
  )

}


export default App;




