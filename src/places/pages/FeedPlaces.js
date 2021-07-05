import React, { useEffect, useContext, useState } from "react";

import PlaceList from "../components/PlaceList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";
import { AuthContext } from "../../shared/context/auth-context";
import { getUsers } from "../../actions/users";

const FeedPlaces = () => {
  const { error, sendRequest, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);

    dispatch(getPosts());
    dispatch(getUsers());

    setIsLoading(false);
  }, [dispatch, auth.userId]);
  const placesReducer = useSelector((state) => state.posts);
  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     // try {
  //     //   const responseData = await sendRequest(
  //     //     `${process.env.REACT_APP_BACKEND_URL}/places`
  //     //   );
  //     //   var newarray = responseData.places.slice().reverse();
  //     //   setLoadedPlaces(newarray);
  //     // } catch (error) {}

  //     var config = {
  //       method: "get",
  //       url: `${process.env.REACT_APP_BACKEND_URL}/places`,
  //       headers: {},
  //     };

  //     axios(config)
  //       .then(function (response) {
  //         var newarray = response.data.places.slice().reverse();
  //         setLoadedPlaces(newarray);
  //         console.log(newarray);
  //       })
  //       .catch(function (error) {
  //         console.log(error);
  //       });
  //   };
  //   fetchPlaces();
  // }, [sendRequest]);

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/users`
  //       );
  //       setLoadedUsers(responseData.users);
  //     } catch (error) {}
  //   };
  //   fetchUsers();
  // }, [sendRequest]);
  const usersReducer = useSelector((state) => state.users);

  // const likeHandler = async (id, userId, token) => {
  //   // var data = JSON.stringify({ likes: auth.userId, placeId: id });

  //   var config = {
  //     method: "patch",
  //     url: `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //       "Content-Type": "application/json",
  //     },
  //     data: JSON.stringify({ likes: userId }),
  //   };

  //   axios(config)
  //     .then(function (response) {
  //       console.log(response.data.likes.length);
  //       setLikesNum(response.data.likes);
  //       setLikesId(id);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  //   // try {
  //   //   await sendRequest(
  //   //     `${process.env.REACT_APP_BACKEND_URL}/places/${id}`,
  //   //     "PATCH",
  //   //     JSON.stringify({ likes: userId }),
  //   //     {
  //   //       "Content-Type": "application/json",
  //   //       Authorization: "Bearer " + token,
  //   //     }
  //   //   );
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  //   console.log(loadedPlaces.find((elemnet) => elemnet.id === id));
  //   // try {
  //   //   await sendRequest(
  //   //     `${process.env.REACT_APP_BACKEND_URL}/places/${auth.userId}`,
  //   //     "PATCH",
  //   //     data,
  //   //     {
  //   //       Authorization: "Bearer " + auth.token,
  //   //       "Content-Type": "application/json",
  //   //     }
  //   //   );

  //   //   // console.log(
  //   //   //   loadedPlaces.map((item) => {
  //   //   //     if (item.likes === responseData.likes) {
  //   //   //       return item;
  //   //   //     } else {
  //   //   //       return responseData;
  //   //   //     }
  //   //   //   })
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // };

  // const placeDeletedHandler = (deletedPlaceId) => {
  //   setLoadedPlaces((prevPlaces) =>
  //     prevPlaces.filter((place) => place.id !== deletedPlaceId)
  //   );
  // };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && placesReducer && (
        <PlaceList
          items={placesReducer}
          usersItem={usersReducer}
          // onDeletePlace={placeDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default FeedPlaces;
