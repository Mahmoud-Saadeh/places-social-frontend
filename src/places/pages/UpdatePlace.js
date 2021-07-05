import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import "./PlaceForm.css";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import { useDispatch } from "react-redux";
import { updatePost } from "../../actions/posts";
import { useSelector } from "react-redux";
import { getPost } from "../../actions/posts";
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

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().placeId;
  const history = useHistory();
  const dispatch = useDispatch();

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // const identifiedPlace = DUMMY_PLACES.find((p) => p.id === placeId);
  // useEffect(() => {
  //   const fetchPlace = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`
  //       );
  //       setLoadedPlace(responseData.place);
  //       setFormData(
  //         {
  //           title: {
  //             value: responseData.place.title,
  //             isValid: true,
  //           },
  //           description: {
  //             value: responseData.place.description,
  //             isValid: true,
  //           },
  //         },
  //         true
  //       );
  //     } catch (error) {}
  //   };
  //   fetchPlace();
  // }, [sendRequest, placeId, setFormData]);
  const placeReducer = useSelector((state) =>
    placeId ? state.posts.find((p) => p._id === placeId) : null
  );
  // const placeReducer = useSelector((state) => state.posts);
  console.log(placeReducer);
  useEffect(() => {
    const fetchPlace = async () => {
      try {
        setFormData(
          {
            title: {
              value: placeReducer.title,
              isValid: true,
            },
            description: {
              value: placeReducer.description,
              isValid: true,
            },
          },
          true
        );
      } catch (error) {}
    };
    fetchPlace();
  }, [placeReducer, setFormData]);

  const placeUpdateSubmitHandler = async (event) => {
    event.preventDefault();
    const postUpdates = {
      title: formState.inputs.title.value,
      description: formState.inputs.description.value,
    };
    dispatch(updatePost(postUpdates, auth.token, placeId));
    history.push("/" + auth.userId + "/places");
    // try {
    //   await sendRequest(
    //     `${process.env.REACT_APP_BACKEND_URL}/places/${placeId}`,
    //     "PATCH",
    //     JSON.stringify({
    //       title: formState.inputs.title.value,
    //       description: formState.inputs.description.value,
    //     }),
    //     {
    //       "Content-Type": "application/json",
    //       Authorization: "Bearer " + auth.token,
    //     }
    //   );
    //
    // } catch (error) {}
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }
  if (isLoading && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place! </h2>
        </Card>
      </div>
    );
  }
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {!isLoading && placeReducer && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={placeReducer.title}
            initialValid={true}
          />
          <Input
            id="description"
            element="textarea"
            label="Description"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (min. 5 characters)."
            onInput={inputHandler}
            initialValue={placeReducer.description}
            initialValid={true}
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
