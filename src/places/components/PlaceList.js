import React from "react";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceList.css";
const PlaceList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found</h2>
          <Button to="/places/new">Share Place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className="place-list">
      {props.items
        .slice(0)
        .reverse()
        .map((place) => (
          // <React.Fragment key={place.id}>
          <PlaceItem
            key={place._id}
            id={place._id}
            imagePlace={place.imagePlace}
            users={props.usersItem}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorId={place.creator}
            createdAt={place.createdAt}
            likes={place.likes}
            coordinates={place.location}
            // onDelete={props.onDeletePlace}
          />
          // </React.Fragment>
        ))}
    </ul>
  );
};
export default PlaceList;
