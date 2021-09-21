export const actionLogin = (payload) => {
  return {
    type: "SIGN_IN",
    payload: payload,
  };
};

export const actionLogout = (payload) => {
  return {
    type: "SIGN_OUT",
    payload: payload,
  };
};
