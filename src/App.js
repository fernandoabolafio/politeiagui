import React, { Component } from "react";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import { Provider } from "react-redux";
import throttle from "lodash/throttle";
import configureStore from "./configureStore";
import { Subreddit } from "./components/snew";
import HeaderAlert from "./components/HeaderAlert";
import SessionExpiresIndicator from "./components/SessionExpiresIndicator";
import Routes from "./Routes";
import loaderConnector from "./connectors/loader";
import { handleSaveTextEditorsContent } from "./lib/editors_content_backup";
import { handleSaveStateToLocalStorage } from "./lib/local_storage";
import { onLocalStorageChange } from "./actions/app";
import ModalStack from "./components/Modal/ModalStack";
import { ONBOARD, CONFIRM_ACTION } from "./components/Modal/modalTypes";
import { verifyUserPubkey } from "./helpers";

const store = configureStore();

store.subscribe(
  throttle(() => {
    const state = store.getState();
    handleSaveTextEditorsContent(state);
    handleSaveStateToLocalStorage(state);
  }, 1000)
);

const createStorageListener = store => event =>
  store.dispatch(onLocalStorageChange(event));

class Loader extends Component {
  constructor(props) {
    super();
    props.onInit();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.loggedInAsEmail && this.props.loggedInAsEmail) {
      this.props.onLoadDraftProposals(this.props.loggedInAsEmail);
    }
    if (prevProps.userPubkey && this.props.userPubkey) {
      verifyUserPubkey(
        this.props.loggedInAsEmail,
        this.props.userPubkey,
        this.props.keyMismatchAction
      );
    }

    if (!prevProps.onboardViewed && this.props.lastLoginTime === 0) {
      const { openModal, setOnboardAsViewed } = this.props;
      setOnboardAsViewed();
      this.props
        .confirmWithModal(CONFIRM_ACTION, {
          title: "Welcome to Politeia!",
          message: (
            <React.Fragment>
              <strong
                style={{
                  fontSize: "1.05em",
                  marginBottom: "10px",
                  fontWeight: "1.2em"
                }}
              >
                Are you new to Politeia? Would you like to read more on how all
                of this works?
              </strong>
              <br />
              <p style={{ marginTop: "10px", fontStyle: "italic" }}>
                The following information can be reviewed by clicking 'Learn
                More about Politiea' in the sidebar.
              </p>
            </React.Fragment>
          ),
          cancelText: "Maybe later",
          submitText: "Yes, show me more"
        })
        .then(confirm => confirm && openModal(ONBOARD));
    }

    if (!prevProps.apiError && this.props.apiError) {
      // Unrecoverable error
      if (this.props.apiError.internalError) {
        this.props.history.push(`/500?error=${this.props.apiError.message}`);
      } else {
        console.error("ERROR:", this.props.apiError.message);
      }
    }
  }

  componentDidMount() {
    if (this.props.loggedInAsEmail) {
      verifyUserPubkey(
        this.props.loggedInAsEmail,
        this.props.userPubkey,
        this.props.keyMismatchAction
      );
    }

    this.storageListener = createStorageListener(store);
    window.addEventListener("storage", this.storageListener);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.storageListener);
  }

  render() {
    return (
      <div className="appWrapper">
        <ModalStack />
        {this.props.children}
      </div>
    );
  }
}

const LoaderComponent = withRouter(loaderConnector(Loader));

const StagingAlert = () =>
  process.env.REACT_APP_STAGING ? (
    <div className="staging-alert">
      This is the politeia staging environment. DO NOT USE, YOU WILL LOSE YOUR
      DECRED.
    </div>
  ) : null;

const HeaderAlertComponent = withRouter(
  loaderConnector(
    ({
      location,
      loggedInAsEmail,
      keyMismatch,
      history,
      loggedInAsUserId,
      identityImportSuccess
    }) => {
      if (!loggedInAsEmail) return null;
      if (
        keyMismatch &&
        !identityImportSuccess &&
        location.pathname !== `/user/${loggedInAsUserId}`
      ) {
        return (
          <HeaderAlert className="action-needed-alert">
            You cannot currently submit proposals or comments, please visit your{" "}
            <a
              style={{ cursor: "pointer" }}
              onClick={() => history.push(`/user/${loggedInAsUserId}`)}
            >
              account page
            </a>{" "}
            to correct this problem.
          </HeaderAlert>
        );
      }
      return null;
    }
  )
);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <LoaderComponent>
            <StagingAlert />
            <SessionExpiresIndicator />
            <HeaderAlertComponent />
            <Subreddit>
              <Routes />
            </Subreddit>
          </LoaderComponent>
        </Router>
      </Provider>
    );
  }
}
