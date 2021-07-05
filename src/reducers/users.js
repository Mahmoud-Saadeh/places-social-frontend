const reducer = (users = [], action) => {
  switch (action.type) {
    case "USERS":
      return action.payload;

    default:
      return users;
  }
};
export default reducer;
