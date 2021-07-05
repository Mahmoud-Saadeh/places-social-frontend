import React from "react";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";
import ReactDOM from "react-dom";

import "./Modal.css";
const ModalOverlay = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      mountOnEnter
      unmountOnExit
      timeout={1000}
      classNames="modal"
    >
      <div className={`modal ${props.className}`} style={props.style}>
        <header className={`modal__header ${props.headerClass}`}>
          <h2>{props.header}</h2>
        </header>
        <form
          onSubmit={
            props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
          }
        >
          <div className={`modal__content ${props.contentClass}`}>
            {props.children}
          </div>
          <footer className={`modal__footer ${props.footerClass}`}>
            {props.footer}
          </footer>
        </form>
      </div>
    </CSSTransition>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};
const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}

      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;
