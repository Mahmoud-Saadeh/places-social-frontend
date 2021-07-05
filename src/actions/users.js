var axios = require("axios");

export const getUsers = () => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  try {
    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/users", {
        cancelToken: source.token,
      })
      .then(function (response) {
        const data = response.data.users;
        dispatch({ type: "USERS", payload: data });
      })
      .catch(function (error) {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.log(error);
        }
      });
  } catch (error) {
    console.log(error.message);
  }
};
