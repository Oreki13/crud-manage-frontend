import localStorage from "local-storage";
import React, { Fragment } from "react";
import { Button, Navbar } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { LogOut } from "../Redux/Actions/user";

const Navbars = (props) => {
  const dispatch = useDispatch();
  const logOut = () => {
    localStorage.remove("token");
    dispatch(LogOut());
  };

  return (
    <Fragment>
      <Navbar bg="primary">
        <div className="container">
          <Navbar.Brand>{props.title}</Navbar.Brand>
          <Button onClick={() => logOut()} variant="danger">
            LogOut
          </Button>
        </div>
      </Navbar>
    </Fragment>
  );
};

export default Navbars;
