import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// views
import RegistrationForm from "../../screens/RegistrationForm";
import Users from '../../screens/userInfo'

export default function Admin() {
  return (
    <>
        <div>
        </div>
        <main>
            <Switch>
            <Route path="/users" exact component={Users} />
             <Route path="/register" exact component={RegistrationForm} />
                <Redirect from="/" to="/register" />
             </Switch>
            <div >
            </div>
        </main>
        <div>
        </div>
    </>
  );
}
