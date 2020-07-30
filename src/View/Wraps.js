import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Login from "../Pages/Login";
import Dashboard from "../Pages/Dashboard";
import localStorage from "local-storage";
import { checkToken } from "../Redux/Actions/user";

const Wraps = (props) => {
  const dispatch = useDispatch();
  const response = useSelector((state) => ({
    listUser: state.user.listUser.result,
    getById: state.user.getById.result,
    status: state.auth.status,
  }));
  const resstat = useSelector((state) => state.auth.status);

  useEffect(() => {
    checkUser();
    // getData();
    return () => {
      checkUser();
    };
  }, []);

  useEffect(() => {
    logout();
  }, [resstat]);

  const checkUser = () => {
    const tok = localStorage.get("token");
    console.log(tok, "INI TOKENN");
    if (tok !== null) {
      dispatch(checkToken(tok));
    } else {
      props.history.push("/login");
    }
  };

  const logout = () => {
    console.log(response.status.error);
    if (response.status.error) {
      localStorage.remove("token");
      props.history.push("/login");
      //   window.location = "/login";
    }
  };
  console.log(response);

  const path = props.match.path;

  return (
    <Fragment>
      {path === "/login" ? <Login {...props} /> : null}
      {path === "/" ? <Dashboard {...props} /> : null}
    </Fragment>
  );
};

export default Wraps;
