import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "semantic-ui-react";
import { openModal } from "../../app/common/modals/modalReducer";
import TestMap from "./TestMap";
import TestPlaceInput from "./TestPlaceInput";
import { decrement, increment } from "./testReducer";

export default function Sandbox() {
  const dispatch = useDispatch();
  const [target, setTarget] = useState(null);
  const data = useSelector((state) => state.test.data);
  const { loading } = useSelector((state) => state.async);
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };
  const [location, setLocation] = useState(defaultProps);

  function handleSetLocation(latLng) {
    setLocation({ ...location, center: { lat: latLng.lat, lng: latLng.lng } });
  }

  return (
    <>
      <h1>Testing 123</h1>
      <h2>The data is: {data} </h2>
      <Button
        name="increment"
        loading={loading && target === 'increment'}
        onClick={(e) => {
          dispatch(increment(20));
          setTarget(e.target.name);
        }}
        content="increment"
        color="green"
      />
      <Button
        name="decrement"
        loading={loading && target === 'decrement'}
        onClick={(e) => {
          dispatch(decrement(10));
          setTarget(e.target.name);
        }}
        content="decrement"
        color="red"
      />
      <Button
        onClick={() =>
          dispatch(openModal({ modalType: "TestModal", modalProps: { data } }))
        }
        content="Open Modal"
        color="teal"
      />
      <div style={{ marginTop: 15 }}>
        <TestPlaceInput setLocation={handleSetLocation} />
        <TestMap location={location} />
      </div>
    </>
  );
}
