import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import SignedInMenu from "./SignedInMenu";
import SignedOutMenu from "./SignedOutMenu";

export default function NavBar({ setFormOpen }) {
  
  const {authenticated} = useSelector(state => state.auth);

 

  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item as={NavLink} exact to="/" header>
          <img src={process.env.PUBLIC_URL + `/assets/logo.png`} alt="logo" style={{ marginRight: 15 }} />
          EventSpace
        </Menu.Item>
        <Menu.Item as={NavLink} to="/events" name="Events" />
        
        {authenticated && (
          <Menu.Item as={NavLink} to="/createEvent">
            <Button inverted  color='' content="Create Event" />
          </Menu.Item>
        )}
        {authenticated ? (
          <SignedInMenu  />
        ) : (
          <SignedOutMenu />
        )}
      </Container>
    </Menu>
  );
}
