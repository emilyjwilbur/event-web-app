import cuid from "cuid";
import React from "react";
import { Link } from "react-router-dom";
import { Header, Segment, Button } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, updateEvent } from "../eventActions";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function EventForm({ match, history }) {
  const dispatch = useDispatch();
  const selectedEvent = useSelector((state) =>
    state.event.events.find((e) => e.id === match.params.id)
  );

  const initialValues = selectedEvent ?? {
    title: "",
    category: "",
    description: "",
    city: "",
    venue: "",
    date: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("You must provide a title"),
    category: Yup.string().required("You must provide a category"),
    description: Yup.string().required(),
    city: Yup.string().required(),
    venue: Yup.string().required(),
    date: Yup.string().required(),
  });

  return (
    <Segment clearing>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values) => {
          selectedEvent
            ? dispatch(updateEvent({ ...selectedEvent, ...values }))
            : dispatch(
                createEvent({
                  ...values,
                  id: cuid(),
                  hostedBy: "Bob",
                  attendees: [],
                  hostPhotoURL: "/assets/user.png",
                })
              );
          history.push("./events");
        }}
      >
        <Form className="ui form">
          <Header content="EVENT DETAILS" />
          <MyTextInput name="title" placeholder="Event Title" />
          <MyTextInput name="category" placeholder="Category" />
          <MyTextArea name="description" placeholder="Description" rows={3} />
          <Header content="EVENT LOCATION DETAILS" />
          <MyTextInput name="city" placeholder="City" />
          <MyTextInput name="venue" placeholder="Venue" />
          <MyTextInput name="date" placeholder="Event Date" type='date' />

          <Button type="submit" floated="right" positive content="Submit" />
          <Button
            as={Link}
            to="events"
            type="submit"
            floated="right"
            content="Cancel"
          />
        </Form>
      </Formik>
    </Segment>
  );
}
