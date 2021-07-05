import React, { useState } from "react";
import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import { Link } from "react-router-dom";
import Backdrop from "../UIElements/Backdrop";
import { CSSTransition } from "react-transition-group";

import "./MainNavigation.css";
const MainNavigation = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const drawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <Backdrop onClick={drawerHandler} />}
      <CSSTransition
        in={drawerIsOpen}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <SideDrawer
          onClick={drawerHandler}
          drawerIsOpen={drawerIsOpen}
          setDrawerIsOpen={setDrawerIsOpen}
        >
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      </CSSTransition>

      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={drawerHandler}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <h1 className="main-navigation__title">
          <Link to="/">SUBLINE</Link>
        </h1>
        <nav className="main-navigation__header-nav">
          <NavLinks />
        </nav>
      </MainHeader>
    </React.Fragment>
  );
};

export default MainNavigation;
