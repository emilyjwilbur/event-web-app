import React, {useEffect} from "react";
import { Grid } from "semantic-ui-react";
import EventList from "./EventList";
import { useSelector } from "react-redux";
import EventListItemPlaceholder from "./EventListItemPlaceholder";
import EventFilters from "./EventFilters";
import { getEventsFromFirestore } from "../../../app/firestore/firestoreService";

export default function EventDashboard() {
  const {events} = useSelector(state => state.event);
  const {loading} = useSelector(state => state.async);

  useEffect(() => {
    const unsubscribe = getEventsFromFirestore({
      next: snapshot => console.log(snapshot.docs.map(docSnapshot => docSnapshot.data())),
      error: error => console.log(error)
    })
    return unsubscribe
  })




  return (
    <Grid>
      <Grid.Column width={10}>
        {loading && 
          <>
          <EventListItemPlaceholder />
          <EventListItemPlaceholder />
          </>
        }
        <EventList events={events} />
      </Grid.Column>
      <Grid.Column width={6}>
        <EventFilters />
      </Grid.Column>
    </Grid>
  );
}
