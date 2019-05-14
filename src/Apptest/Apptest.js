import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Config from "src/Config";
import { defaultLightTheme, useTheme, Container } from "pi-ui";
import Header from "src/componentsv2/Header";
import { ReduxProvider } from "src/redux";
import Loader from "./Loader";
import Routes from "src/pages/Root";

const App = () => {
  useTheme(defaultLightTheme);
  return (
    <Config>
      <ReduxProvider>
        <Loader>
          <Container>
            <Router>
              <>
                <Header />
                <Routes />
              </>
            </Router>
          </Container>
        </Loader>
      </ReduxProvider>
    </Config>
  );
};

export default App;
