const initialState = {
  UserEmailID: "",
  isLogin: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN":
      return {
        ...initialState,
        UserEmailID: action.emailID,
        isLogin: true,
      };
    default:
      return state;
  }
};

export default AuthReducer;
