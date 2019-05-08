import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom";
// import "snew-classic-ui/static/css/reddit.css";
// import "font-awesome/css/font-awesome.min.css";
// import "./style/index.css";
// import "./style/theme/index.css";
import App from "./App";

// lazy load the v2 so it doesn't affect the app bundle size
const AppV2 = lazy(() => import("./AppV2"));

// This is a temporary hook
const WhichApp = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {process.env.REACT_APP_V2 ? <AppV2 /> : <App />}
    </Suspense>
  );
};

ReactDOM.render(<WhichApp />, document.body);
