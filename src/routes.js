import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";

const AppRoutes = () => {
  const loginSession = useSelector((state) => state.loginReducer);
  const isLoggedIn = loginSession.login === "true" ? true : false;
  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            {isLoggedIn ? (
              <>
                <Redirect to="/users" />
                {/* <Users /> */}
              </>
            ) : (
              <>
                <Login />
              </>
            )}
          </Route>
          <Route path="/login">
            {isLoggedIn ? (
              <>
                <Redirect to="/users" />
                {/* <Users /> */}
              </>
            ) : (
              <>
                <Login />
              </>
            )}
          </Route>
          <Route path="/users">
            {isLoggedIn ? (
              <>
                <Users />
              </>
            ) : (
              <>
                <Redirect to="/login" />
                {/* <Login /> */}
              </>
            )}
          </Route>
          <Route path="/userdetails">
            {isLoggedIn ? (
              <>
                <UserDetails />
              </>
            ) : (
              <>
                <Redirect to="/login" />
                {/* <Login /> */}
              </>
            )}
          </Route>
          <Route
            path="*"
            render={() => (
              <>
                <h1>Error - Page not found!</h1>
              </>
            )}
          />
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default AppRoutes;
