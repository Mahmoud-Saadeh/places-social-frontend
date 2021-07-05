import React from "react";
// import ReactDOM from "react-dom";
// import { CSSTransition } from "react-transition-group";
import "./SideDrawer.css";
// const SideDrawer = (props) => {
//   // const content = <aside className="side-drawer">{props.children}</aside>;
//   return ReactDOM.createPortal(
//     <React.Fragment>
//       <CSSTransition
//         in={props.show}
//         timeout={200}
//         classNames="slide-in-left"
//         mountOnEnter
//         unmountOnExit
//       >
//         <aside className="side-drawer">
//           <div
//             onClick={() => {
//               props.setDrawerIsOpen(!props.drawerIsOpen);
//             }}
//           ></div>
//           {props.children}
//         </aside>
//       </CSSTransition>
//     </React.Fragment>,
//     document.getElementById("drawer-hook")
//   );
// };

const SideDrawer = (props) => {
  return (
    <React.Fragment>
      <aside onClick={props.onClick} className="side-drawer">
        <div
          onClick={() => {
            props.setDrawerIsOpen(!props.drawerIsOpen);
          }}
        ></div>
        {props.children}
      </aside>
    </React.Fragment>
  );
};

export default SideDrawer;
