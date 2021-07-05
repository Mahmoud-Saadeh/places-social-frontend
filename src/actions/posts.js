import {
  FETCH_ALL,
  DELETE,
  UPDATE,
  LIKE,
  CREATE,
} from "../constants/actionTypes";
var axios = require("axios");

// import * as api from "../api";

//Action Creators
export const getPosts = () => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  try {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/places`, {
        cancelToken: source.token,
      })
      .then(function (response) {
        const data = response.data.places;
        dispatch({ type: FETCH_ALL, payload: data });
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
  // source.cancel("Operation canceled by the user.");
};

export const getPostsByUser = (userId, setIsLoadingMe) => async (dispatch) => {
  setIsLoadingMe(true);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  try {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`, {
        cancelToken: source.token,
      })
      .then(function (response) {
        const data = response.data.places;
        dispatch({ type: FETCH_ALL, payload: data });
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
  setIsLoadingMe(false);
  // source.cancel("Operation canceled by the user.");
};

export const createPost = (formData, token) => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

  axios
    .post(
      process.env.REACT_APP_BACKEND_URL + "/places",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        cancelToken: source.token,
      }
    )
    .then(function (response) {
      dispatch({ type: CREATE, payload: response.data.place });
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
    });
};

export const updatePost = (postUpdates, token, placeId) => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
      postUpdates,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        cancelToken: source.token,
      }
    )
    .then(function (response) {
      dispatch({ type: UPDATE, payload: response.data.place });
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
    });
};

export const deletePost = (id, token) => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios
    .delete(
      process.env.REACT_APP_BACKEND_URL + `/places/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        cancelToken: source.token,
      }
    )
    .then(function (response) {
      dispatch({ type: DELETE, payload: id });
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
    });
};
export const likePost = (id, token, userId) => async (dispatch) => {
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();
  axios
    .patch(
      `${process.env.REACT_APP_BACKEND_URL}/places/${id}/likes`,
      { likes: userId, placeId: id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      {
        cancelToken: source.token,
      }
    )
    .then(function (response) {
      console.log(response.data);
      dispatch({ type: LIKE, payload: response.data });
    })
    .catch(function (error) {
      if (axios.isCancel(error)) {
        console.log("Request canceled", error.message);
      } else {
        console.log(error);
      }
    });
};
