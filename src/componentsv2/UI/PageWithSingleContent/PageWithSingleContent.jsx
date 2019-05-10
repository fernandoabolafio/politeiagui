import React from "react";
import {
  Card,
} from "pi-ui";
import "./styles.css";

const PageWithSingleContent = ({ children }) => {
  return (    
      <div className="contentWrapper">
        <Card paddingSize={"medium"}>{children}</Card>
      </div>
  );
};

export default PageWithSingleContent;
