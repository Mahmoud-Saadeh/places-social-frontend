import React, { useEffect, useState } from 'react';
import PlaceList from '../components/PlaceList';
import { useParams } from 'react-router-dom';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getPostsByUser } from '../../actions/posts';
import { getUsers } from '../../actions/users';

// var axios = require("axios");
// const DUMMY_PLACES = [
//   {
//     id: "p1",
//     title: "Lorem ipsum dolor sit amet.",
//     description: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg",
//     address: "20 w 34th",
//     location: { lat: 40, lng: -73 },
//     creator: "u1",
//   },
//   {
//     id: "p2",
//     title: "Lorem 2ipsum dolor sit amet.",
//     description: "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet.",
//     imageUrl:
//       "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg",
//     address: "20 w 34th",
//     location: { lat: 40.2288648, lng: -74.9353236 },
//     creator: "u2",
//   },
// ];

const UserPlaces = () => {
  const { error, clearError } = useHttpClient();
  const [isLoadingMe, setIsLoadingMe] = useState();

  const userId = useParams().userId;
  // const likeHandler = () => {
  //   setLikesNum((prev) => !prev);
  //   console.log(likesNum);
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPostsByUser(userId, setIsLoadingMe));
    dispatch(getUsers());
  }, [dispatch, userId, isLoadingMe]);
  const placesReducer = useSelector((state) => state.posts);
  // useEffect(() => {
  //   const fetchPlaces = async () => {
  //     // try {
  //     //   const responseData = await sendRequest(
  //     //     `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`
  //     //   );
  //     //   var newarray = responseData.places.slice().reverse();
  //     //   setLoadedPlaces(newarray);
  //     // } catch (error) {}
  //     var config = {
  //       method: "get",
  //       url: `${process.env.REACT_APP_BACKEND_URL}/places/user/${userId}`,
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
  // }, [sendRequest, userId]);

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
  // const loadedPlaces = DUMMY_PLACES.filter((place) => place.creator === userId);

  // const placeDeletedHandler = (deletedPlaceId) => {
  //   setLoadedPlaces((prevPlaces) =>
  //     prevPlaces.filter((place) => place.id !== deletedPlaceId)
  //   );
  // };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoadingMe && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoadingMe && placesReducer && (
        <PlaceList
          items={placesReducer}
          usersItem={usersReducer}
          // onDeletePlace={placeDeletedHandler}
        />
      )}
    </React.Fragment>
  );
};

export default UserPlaces;
