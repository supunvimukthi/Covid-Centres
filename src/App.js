import React, { useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "layouts/Admin.js";




import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.3.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import useToken from './UseToken';
import useUser from './UseUser'
import Login from 'views/Login';
import 'toastr/build/toastr.min.css'


function App() {
    const {user, setUser} = useUser();
    const {token, setToken} = useToken();
  if(!token) {
    return <Login setToken={setToken} setUser={setUser} />
  }

  return (
    <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout user={user} {...props} />} />
      {user=='admin'&&<Redirect to="/admin/dashboard" />}
      {user!='admin'&&<Redirect to="/admin/update" />}
    </Switch>
  </BrowserRouter>
  );
}

export default App;