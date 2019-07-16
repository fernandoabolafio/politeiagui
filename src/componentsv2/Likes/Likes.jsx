import React from "react";
import PropTypes from "prop-types";
import { Icon, useTheme, getThemeProperty } from "pi-ui";
// import LikeIcon from "./assets/like.svg";

const Likes = ({ likes, onLike, active }) => {
  const theme = useTheme();
  const defaultColor = getThemeProperty(theme, "color-gray");
  const activeColor = getThemeProperty(theme, "color-primary-gray");
  const color = active ? activeColor : defaultColor;
  return (
    <div>
      {likes}
      <Icon
        onClick={onLike}
        iconColor={color}
        backgroundColor={color}
        type="like"
      />
    </div>
  );
};

Likes.propTypes = {
  active: PropTypes.bool,
  onLike: PropTypes.func
};

Likes.defaultProps = {
  active: false
};

export default Likes;
