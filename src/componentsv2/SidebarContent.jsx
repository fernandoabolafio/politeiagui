import { Card } from "pi-ui";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useConfig } from "src/Config";
import PaywallMessage from "./PaywallMessage";
import StaticMarkdown from "./StaticMarkdown";

const SidebarContent = ({ wrapper }) => {
  const WrapperComponent = wrapper;
  const { aboutContent } = useConfig();
  return useMemo(
    () => (
      <WrapperComponent>
        <PaywallMessage />
        <Card paddingSize="small">
          <StaticMarkdown contentName={aboutContent} />
        </Card>
      </WrapperComponent>
    ),
    [aboutContent]
  );
};

SidebarContent.propTypes = {
  wrapper: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
};

SidebarContent.defaultProps = {
  wrapper: React.Fragment
};

export default SidebarContent;
