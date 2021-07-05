import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";
const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink exact to="/">
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/feed">
          FEEDS
        </NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink exact to={`/${auth.userId}/places`}>
            MY PROFILE
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink exact to="/places/new">
            ADD POST
          </NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink exact to="/auth">
            SIGN IN
          </NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
