const initialState = {
  dataUser: [],
  status: [],
  other: [],
  update: [],
  isLoading: false,
  isFulfielled: false,
  isRejected: false,
};

const auth = (state = initialState, action) => {
  // console.log(action);

  switch (action.type) {
    case "POST_LOGIN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "POST_LOGIN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "POST_LOGIN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        dataUser: action.payload.data,
      };
    case "POST_REGISTER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "POST_REGISTER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "POST_REGISTER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        other: action.payload.data,
      };

    case "GET_TOKEN_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "GET_TOKEN_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_TOKEN_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        status: action.payload.data,
      };
    case "UPDATE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "UPDATE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "UPDATE_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        update: action.payload.data,
      };
    case "CLEAR_UPDATE":
      return {
        ...state,
        update: [],
        other: [],
      };
    case "LOGOUT":
      return {
        ...state,
        dataUser: [],
        status: [],
      };

    default:
      return state;
  }
};
export default auth;
