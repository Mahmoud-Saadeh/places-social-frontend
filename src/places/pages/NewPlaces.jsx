import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useDispatch } from 'react-redux';
import { createPost } from '../../actions/posts';

import './PlaceForm.css';

const NewPlaces = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const [selectedImage, setSelectedImage] = useState();
  const { isLoading, error, clearError } = useHttpClient();
  const dispatch = useDispatch();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false,
      },
      description: {
        value: '',
        isValid: false,
      },
      address: {
        value: '',
        isValid: false,
      },
      imagePlace: {
        //this has to be image because of the ImageUpload comp id.
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const newPostData = {
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
        address: formState.inputs.address.value,
        imagePlace: selectedImage,
      };
      // const formData = new FormData();
      // formData.append('title', formState.inputs.title.value);
      // formData.append('description', formState.inputs.description.value);
      // formData.append('address', formState.inputs.address.value);

      // formData.append('imagePlace', formState.inputs.imagePlace.value); //the 'image' here has to be image because of the backend

      dispatch(createPost(newPostData, auth.token));

      // await sendRequest(
      //   process.env.REACT_APP_BACKEND_URL + "/places",
      //   "POST",
      //   formData,
      //   {
      //     Authorization: "Bearer " + auth.token,
      //   }
      // );
      //Redirect the user to a different page
      history.push(`/${auth.userId}/places`);
    } catch (error) {}
  };
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
        />
        <Input
          element="textarea"
          id="description"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description (at least 5 characters)."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          type="text"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="imagePlace"
          onInput={inputHandler}
          errorText="Please provide an image."
          setSelectedImage={setSelectedImage}
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlaces;
