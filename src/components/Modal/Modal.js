import React from "react";

const Modal = props => {
  return (
    <div className="modal">
      <div className="modal-overlay" />
      <div className="modal-container">{props.children}</div>
    </div>
  );
};

export default Modal;
