import Axios from "axios";

export const login = (body) => {
  return {
    type: "POST_LOGIN",
    payload: Axios.post(
      process.env.REACT_APP_URL +
        `auth/login
    `,
      body,
      {
        headers: { authorization: "soul" },
      }
    ),
  };
};

export const register = (body) => {
  return {
    type: "POST_REGISTER",
    payload: Axios.post(
      process.env.REACT_APP_URL +
        `auth/register
    `,
      body,
      {
        headers: { authorization: "soul" },
      }
    ),
  };
};
export const updateUser = (id, body) => {
  return {
    type: "UPDATE_USER",
    payload: Axios.post(
      process.env.REACT_APP_URL +
        `auth/updateUser/${id}
    `,
      body,
      {
        headers: { authorization: "soul" },
      }
    ),
  };
};
export const clearUpdate = () => {
  return {
    type: "CLEAR_UPDATE",
  };
};
export const clearOther = () => {
  return {
    type: "CLEAR_OTHER",
  };
};

export const GetAll = (sort, page) => {
  return {
    type: "GET_ALL_USER",
    payload: Axios.get(
      process.env.REACT_APP_URL + `user/getAll/${sort}/${page}`,
      {
        headers: { authorization: "soul" },
      }
    ),
  };
};
export const LogOut = () => {
  return {
    type: "LOGOUT",
  };
};

export const GetById = (id) => {
  return {
    type: "GET_BY_ID",
    payload: Axios.get(process.env.REACT_APP_URL + `auth/getus/${id}`, {
      headers: { authorization: "soul" },
    }),
  };
};
export const GetLevel = () => {
  return {
    type: "GET_LEVEL",
    payload: Axios.get(process.env.REACT_APP_URL + `user/level`, {
      headers: { authorization: "soul" },
    }),
  };
};
export const GetLevelById = (id) => {
  return {
    type: "GET_LEVELID",
    payload: Axios.get(process.env.REACT_APP_URL + `user/level/${id}`, {
      headers: { authorization: "soul" },
    }),
  };
};

export const updatePermission = (body) => {
  return {
    type: "POST_PERMISSION",
    payload: Axios.post(
      process.env.REACT_APP_URL +
        `user/updatePerm
    `,
      body,
      {
        headers: { authorization: "soul" },
      }
    ),
  };
};
export const checkToken = (token, id) => {
  return {
    type: "GET_TOKEN",
    payload: Axios.get(
      process.env.REACT_APP_URL + `auth/checkTok/${token}`,

      {
        headers: { "x-control-user": id, authorization: "soul" },
      }
    ),
  };
};

export const deleteUser = (id) => {
  return {
    type: "DELETE_USER",
    payload: Axios.get(process.env.REACT_APP_URL + `user/deleted/${id}`, {
      headers: { authorization: "soul" },
    }),
  };
};
