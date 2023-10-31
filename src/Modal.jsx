import React, { useState } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";

// ce code reprend la logique du code sur captuerreur.jsx et implemente des nouvelles methodes  pour abouttir a ses faims
// les proptypes ici seront utiles pour preciser le type des elements, afin d eviter des erreur lors des appeles car nous savons que le js n est pas rigoureusement type

function Modal({
  onClose,
  children = "bonjour child",
  title = "titre par defaut",
}) {
  // throw new Error();
  return createPortal(
    <div>
      <div
        className="modal fade show"
        tabIndex="-1"
        role="dialog"
        style={{ display: "block" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title"> {title} </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Fermer"
              >
                <span aria-hidden="true" onClick={onClose}>
                  &times;
                </span>
              </button>
            </div>
            <div className="modal-body">{children}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={onClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show"></div>
    </div>,
    document.body
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};
Modal.defaultProps = {
  children: "Bonjour props",
};

function Double({ n }) {
  return `le double de ${n} est ${n + n}`;
}
Double.propTypes = {
  n: PropTypes.number.isRequired,
};

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: false };
  }
  static getDerivedStateFromError(error) {
    return { error: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.error) {
      return <div className=" alert alert-danger">il y a eu une erreur</div>;
    }
    return this.props.children;
  }
}

function App1() {
  const [modal, setModal] = useState(false);
  const showModal = function () {
    setModal(true);
  };

  const hideModal = function () {
    setModal(false);
  };
  const log = function () {
    console.log("click");
    // throw new Error();
  };

  const style = {
    // transform: translateY(1px);
  };
  return (
    <div className="card" style={style} onClick={log}>
      <div className="card-body">
        <h5 className="card-text"> card title</h5>
        <p className="card-text">
          same quick example text to build on the card title and up the bulk of
          the card's content
        </p>
        <p>
          <Double n={1} />
        </p>
        <button onClick={showModal} className="btn btn-primary">
          go somewhere
        </button>
      </div>
      {modal && <Modal onClose={hideModal} />}
    </div>
  );
}

export default App1;
