const initialState = {
  listUser: [],
  getById: [],
  other: [],
  level: [],
  levelId: [],
  isLoading: true,
  isFulfielled: false,
  isRejected: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "GET_ALL_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_ALL_USER_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        listUser: action.payload.data,
      };
    case "GET_BY_ID_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "GET_BY_ID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_BY_ID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        getById: action.payload.data,
      };
    case "POST_PERMISSION_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "POST_PERMISSION_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "POST_PERMISSION_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        other: action.payload.data,
      };
    case "DELETE_USER_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "DELETE_USER_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "DELETE_USER_FULFILLED":
      const dataAfterDelete = state.listUser.result.filter(
        (item) => item.id != action.payload.data.result.id
      );
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        listUser: {
          ...state.listUser,
          result: dataAfterDelete,
        },
      };
    case "GET_LEVEL_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "GET_LEVEL_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_LEVEL_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        level: action.payload.data,
      };
    case "GET_LEVELID_PENDING":
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfielled: false,
      };
    case "GET_LEVELID_REJECTED":
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case "GET_LEVELID_FULFILLED":
      return {
        ...state,
        isLoading: false,
        isFulfielled: true,
        levelId: action.payload.data,
      };
    case "CLEAR_OTHER":
      return {
        ...state,
        other: [],
      };

    default:
      return state;
  }
};
export default user;
