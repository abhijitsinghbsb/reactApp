import React from "react";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
export default function UserDetails() {
  return (
    <>
      Navigated to this page on deleting a record..
      <Link to="/users">
        <Button variant="contained">Go to Users Page</Button>
      </Link>
    </>
  );
}
