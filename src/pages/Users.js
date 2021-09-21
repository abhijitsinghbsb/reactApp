import React from "react";
import { Button, Snackbar, TextField } from "@material-ui/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actionLogout } from "../actions";
import { useEffect } from "react";
import axios from "axios";
import { URL_USERS } from "../constants/Constants";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
export default function Users() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleSnackClose = () => {
    setState({ ...state, open: false });
  };
  const initialInputUser = {
    firstName: "",
    lastName: "",
    place: "",
  };
  const [inputUser, setInputUser] = useState(initialInputUser);

  async function fetchData() {
    const resp = await axios.get(URL_USERS);
    setUsers(resp.data);
  }

  const deleteUser = (fName) => {
    console.log("In delete user method to delete " + fName);
    setUsers(
      users.filter((item) => {
        return item.firstName !== fName;
      })
    );
  };

  useEffect(() => {
    console.log("Users will be fetched only once when page loads..");
    //console.log("Not fetching data anymore");
    fetchData();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    console.log(`Add User invoked`);
    const resp = await axios.post(URL_USERS, inputUser);

    // Assumes this is the only channel that adds data.
    // If there are any other channel, then we can invoke fetchData()
    //setUsers([...users, resp.data]);
    setUsers([...users, inputUser]);
    //fetchData();
    console.log(`Add User resp: ${resp.data}`);
    setInputUser(initialInputUser);
  }

  return (
    <>
      <Button variant="contained" onClick={() => dispatch(actionLogout())}>
        Log Out
      </Button>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={3000}
        onClose={handleSnackClose}
        message="Item deleted"
        key={vertical + horizontal}
      />
      <form onSubmit={onSubmit}>
        <TextField
          required
          id="textField-adduser-firstName"
          label="First Name"
          placeholder="Enter your first name"
          variant="outlined"
          value={inputUser.firstName}
          onChange={(e) => setInputUser({ ...inputUser, firstName: e.target.value })}
        />
        <TextField
          required
          id="textField-adduser-lastName"
          label="Last Name"
          placeholder="Enter your last name"
          variant="outlined"
          value={inputUser.lastName}
          onChange={(e) => setInputUser({ ...inputUser, lastName: e.target.value })}
        />
        <TextField
          id="textField-adduser-place"
          label="Place"
          placeholder="Enter your location"
          variant="outlined"
          value={inputUser.place}
          onChange={(e) => setInputUser({ ...inputUser, place: e.target.value })}
        />

        <Button variant="contained" type="submit">
          Add user
        </Button>
      </form>
      <ul>
        {users &&
          users.map((user) => {
            return (
              <li key={user.firstName ?? user._id}>
                {`${user.firstName} ${user.lastName} ${user.place}`}
                <Button
                  onClick={() => {
                    deleteUser(user.firstName);
                    setState({ open: true, vertical: "bottom", horizontal: "left" });
                  }}
                >
                  Delete + Snackbar
                </Button>
                <Button
                  onClick={() => {
                    console.log(`Delete + Modal ${user.firstName}`);
                  }}
                >
                  Delete + Modal
                </Button>
                <Link to="/userdetails">
                  <Button
                    variant="contained"
                    onClick={() => {
                      console.log(`Delete + Navigate ${user.firstName}`);
                      //<Redirect to="/userdetails" />;
                      console.log(`Post Delete + Navigate ${user.firstName}`);
                    }}
                  >
                    Delete + Navigate
                  </Button>
                  <Button
                    onClick={() => {
                      history.push("/userdetails");
                    }}
                  >
                    Navigate using History
                  </Button>
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
}
