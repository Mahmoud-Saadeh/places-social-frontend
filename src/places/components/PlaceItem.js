import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import Avatar from '../../shared/components/UIElements/Avatar';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { likePost, deletePost } from '../../actions/posts';
import { FaThumbsUp, FaRegThumbsUp } from 'react-icons/fa';

import './PlaceItem.css';

const PlaceItem = (props) => {
  const { isLoading, error, clearError } = useHttpClient();
  const auth = useContext(AuthContext);
  const [showMap, setShowMap] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const dispatch = useDispatch();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // const [like, setLike] = useState(true);

  // useEffect(() => {
  //   const likeHandler = async () => {
  //     const formData = new FormData();
  //     formData.append("likes", auth.userId);
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
  //   likeHandler();
  // }, [sendRequest, placeId, setFormData]);

  const Likes = () => {
    console.log(props);
    const likenum = props.likes;
    if (likenum) {
      if (likenum.length > 0) {
        return likenum.find((like) => like === auth.userId) ? (
          <div>
            <FaThumbsUp fontSize="large" />
            &nbsp;
            {likenum.length > 2
              ? `You and ${likenum.length - 1} others`
              : `${likenum.length} like${likenum.length > 1 ? 's' : ''}`}
          </div>
        ) : (
          <div>
            <FaRegThumbsUp fontSize="large" />
            &nbsp;{likenum.length} {likenum.length === 1 ? 'Like' : 'Likes'}
          </div>
        );
      }
    }

    return (
      <React.Fragment>
        <FaRegThumbsUp fontSize="large" />
        &nbsp;Like
      </React.Fragment>
    );
  };

  const showDeleteWarningHandler = () => {
    setShowSettings(false);
    setShowConfirmModal(true);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const dropDownHandler = (e) => {
    if (
      e.target.classList.contains('btn-settings') ||
      e.target.classList.contains('dot')
    ) {
      setShowSettings(!showSettings);
    } else {
      setShowSettings(false);
    }
  };
  const confirmDeleteHandler = async () => {
    setShowConfirmModal(false);
    dispatch(deletePost(props.id, auth.token));
    // try {
    //   await sendRequest(
    //     process.env.REACT_APP_BACKEND_URL + `/places/${props.id}`,
    //     "DELETE",
    //     null,
    //     { Authorization: "Bearer " + auth.token }
    //   );
    //   props.onDelete(props.id);
    // } catch (error) {}
  };

  const openMapHandler = () => setShowMap(true);

  const closeMapHandler = () => setShowMap(false);
  let name;
  let img;
  if (props.users) {
    props.users.find((u) => {
      if (u.id === props.creatorId) {
        name = u.name;
        img = u.image;
        return null;
      } else {
        return null;
      }
    });
  }

  return (
    <div onClick={dropDownHandler}>
      <ErrorModal error={error} onClear={clearError} />

      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="palce-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>CLOSE</Button>}
      >
        <div className="map-container">
          <Map center={props.coordinates} id={props.id} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="DELETE"
        footerClass="place-item__modal-actions"
        footer={
          <React.Fragment>
            <Button inverse onClick={cancelDeleteHandler}>
              CANCEL
            </Button>
            <Button danger onClick={confirmDeleteHandler}>
              DELETE
            </Button>
          </React.Fragment>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          can't be undone thereafter
        </p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="post-header">
            <div className="post-header-user">
              <Avatar
                className="image"
                // image={`${process.env.REACT_APP_ASSET_URL}/${img}`}
                image={`${img}`}
                alt={name}
              />
              <div className="place-item__profile-info">
                <h5 className="name">{name}</h5>
                <div className="createdAt">
                  <p>{`${moment(props.createdAt).fromNow()}`}</p>
                </div>
              </div>
            </div>
            <div>
              {auth.userId === props.creatorId && (
                <React.Fragment>
                  <div className="btn-settings">
                    <span className="dot"></span>
                    <span className="dot"></span>
                    <span className="dot"></span>
                  </div>
                  {showSettings && (
                    <ul className="drop-down">
                      <Link
                        onClick={dropDownHandler}
                        to={`/places/${props.id}`}
                      >
                        <li>EDIT</li>
                      </Link>
                      <li onClick={showDeleteWarningHandler}>Delete</li>
                    </ul>
                  )}
                </React.Fragment>
              )}
            </div>
          </div>

          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__image">
            <img
              // src={`${process.env.REACT_APP_ASSET_URL}/${props.imagePlace}`}
              src={`${props.imagePlace}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__actions">
            <div className="place-item_interaction">
              <button
                onClick={() =>
                  dispatch(likePost(props.id, auth.token, auth.userId))
                }
              >
                <Likes />
              </button>
            </div>
            <div>
              <Button inverse onClick={openMapHandler}>
                VIEW ON MAP
              </Button>
              {/* {auth.userId === props.creatorId && (
                <Button to={`/places/${props.id}`}>EDIT</Button>
              )}
              {auth.userId === props.creatorId && (
                <Button onClick={showDeleteWarningHandler} danger>
                  DELETE
                </Button>
              )} */}
            </div>
          </div>
        </Card>
      </li>
    </div>
  );
};

export default PlaceItem;
