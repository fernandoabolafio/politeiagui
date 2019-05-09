import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";

// lazy load the v2 so it doesn't affect the app bundle size
// and the styles from old version doesn't affect v2
const AppV2 = lazy(() => import("src/AppV2"));
const App = lazy(() => import("./App"));

// This is a temporary hook
const WhichApp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {process.env.REACT_APP_V2 ? <AppV2 /> : <App />}
    </Suspense>
  );
};

const targetElement = process.env.REACT_APP_V2
  ? document.getElementById("root")
  : document.body;

ReactDOM.render(<WhichApp />, targetElement);
