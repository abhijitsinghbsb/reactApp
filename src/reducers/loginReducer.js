const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(`Sign In action received by reducer with ${JSON.stringify(action.payload)}`);
      state = action.payload;
      break;
    case "SIGN_OUT":
      console.log(`Sign OUT action received by reducer with ${JSON.stringify(action.payload)}`);
      state = {};
      break;
    default:
      console.log(`Unhandled or default action received by reducer. ${action.type}`);
      break;
  }

  return state;
};

export default loginReducer;
