import React from "react";
import { TextField, Grid, Button } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogin } from "../actions";
import { Button as SAPButton } from "fundamental-react/lib/Button";

const initLoginObj = {
  username: "",
  password: "",
};

export default function Login() {
  const [loginData, setLoginData] = useState(initLoginObj);
  const dispatch = useDispatch();

  function onLogin(e) {
    e.preventDefault();
    if (loginData.username === "abhijit" && loginData.password === "pwd") {
      dispatch(actionLogin({ login: "true" }));
      setLoginData(initLoginObj);
    } else {
      dispatch(actionLogin({ login: "false" }));
    }
  }

  return (
    <>
      <form onSubmit={onLogin}>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={6}>
            <TextField
              required
              id="textField-login-username"
              label="Username"
              placeholder="Enter your username"
              variant="outlined"
              value={loginData.username}
              onChange={(e) => {
                console.log(`Value change ${e.target.value}`);
                setLoginData({ ...loginData, username: e.target.value });
              }}
            />
            <TextField
              required
              id="textField-login-password"
              label="Password"
              placeholder="Enter your password"
              type="password"
              autoComplete="current-password"
              variant="outlined"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Login
            </Button>
            <SAPButton
              option="emphasized"
              onClick={() => {
                alert("This is SAP button");
              }}
            >
              Emphasized Button
            </SAPButton>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
