import React, { useEffect, useState } from "react";
import UsersList from "../components/UsersList";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getUsers } from "../../actions/users";
const Users = () => {
  // const USERS = [
  //   {
  //     id: "u1",

  //     name: "Mahmoud Saadeh",
  //     image:
  //       "https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_960_720.jpg",
  //     places: 3,
  //   },
  // ];
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  // const [loadedUsers, setLoadedUsers] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        // const response = await fetch("http://localhost:5000/api/users");
        // const responseData = await axios.get(
        //   process.env.REACT_APP_BACKEND_URL + "/users"
        // );

        dispatch(getUsers());

        // const responseData = await response.json();

        // if (!response.ok) {
        //   throw new Error(responseData.message);
        // }

        // setLoadedUsers(responseData.data.users);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, [dispatch]);
  const usersReducer = useSelector((state) => state.users);
  console.log(usersReducer);
  const errorHandler = () => {
    setError(null);
  };
  return (
    <div>
      <React.Fragment>
        <ErrorModal error={error} onClear={errorHandler} />
        {isLoading && (
          <div className="center">
            <LoadingSpinner />
          </div>
        )}
        {!isLoading && usersReducer && <UsersList items={usersReducer} />}
      </React.Fragment>
    </div>
  );
};

export default Users;
