import localStorage from "local-storage";
import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../component/Navbar";
import AddUser from "../Pages/AddUser";
import Dashboard from "../Pages/Dashboard";
import EditUser from "../Pages/EditUser";
import SettingPerm from "../Pages/settingPerm";
import Setting from "../Pages/Settings";
import { checkToken, LogOut } from "../Redux/Actions/user";

const Wrap = (props) => {
  const response = useSelector((state) => ({
    listUser: state.user.listUser.result,
    getById: state.user.getById.result,
    status: state.auth.status,
  }));

  let match = props.match.path;
  const dispatch = useDispatch();

  const checkUser = () => {
    const tok = localStorage.get("token");
    if (tok !== null) {
      dispatch(checkToken(tok));
    } else {
      props.history.push("/login");
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    logout();
  }, [response.status]);

  const logout = () => {
    const tok = localStorage.get("token");
    if (response.status.error) {
      localStorage.remove("token");
      dispatch(LogOut());
      props.history.push("/login");
    } else if (!tok) {
      props.history.push("/login");
    }
  };

  return (
    <Fragment>
      <Navbar title={props.title} {...props} />
      {match === "/" ? <Dashboard {...props} /> : null}
      {match === "/setting/" ? <Setting {...props} /> : null}
      {match === "/editSetting/:id" ? <SettingPerm {...props} /> : null}
      {match === "/addUser" ? <AddUser {...props} /> : null}
      {match === "/editUser/:id" ? <EditUser {...props} /> : null}
    </Fragment>
  );
};

// const mapStateToProps = state => {
//     return {
//         user: state.user
//     };
// };

export default Wrap;
