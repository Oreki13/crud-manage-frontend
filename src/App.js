import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./assets/bootstrap/css/mycss.css";
import Login from "./Pages/Login";
import store from "./Redux/store";
import Wrap from "./View/Wrap";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route
          exact
          path="/"
          render={(props) => <Wrap {...props} title="Dashboard" />}
        />
        <Route
          path="/setting/"
          render={(props) => <Wrap {...props} title="Setting" />}
        />
        <Route
          path="/editSetting/:id"
          render={(props) => <Wrap {...props} title="Edit Permission" />}
        />
        <Route
          path="/editUser/:id"
          render={(props) => <Wrap {...props} title="Edit User" />}
        />
        <Route
          path="/addUser"
          render={(props) => <Wrap {...props} title="Add User" />}
        />
        <Route
          path="/login"
          render={(props) => <Login {...props} title="Add User" />}
        />
      </Router>
    </Provider>
  );
}

export default App;
