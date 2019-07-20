import React from "react";
import PropTypes from "prop-types";
import {
  Icon,
  useTheme,
  Text,
  getThemeProperty,
  useHover,
  classNames
} from "pi-ui";
import styles from "./Likes.module.css";

export const isLiked = action => action === 1 || action === "1";
export const isDisliked = action => action === -1 || action === "-1";

const Likes = ({ likes, onLike, onDislike, option, disabled }) => {
  const theme = useTheme();
  const [likeRef, isLikeHovered] = useHover();
  const [dislikeRef, isDislikeHovered] = useHover();
  const defaultColor = getThemeProperty(theme, "color-gray");
  const activeColor = getThemeProperty(theme, "color-primary-dark");
  const liked = isLiked(option);
  const disliked = isDisliked(option);
  const likeColor =
    (liked || isLikeHovered) && !disabled ? activeColor : defaultColor;
  const dislikeColor =
    (disliked || isDislikeHovered) && !disabled ? activeColor : defaultColor;

  function handleLike() {
    if (disabled) return;
    onLike();
  }

  function handleDislike() {
    if (disabled) return;
    onDislike();
  }

  return (
    <div className="align-center">
      <button
        disabled={disabled}
        ref={likeRef}
        className={classNames(styles.likeBtn, "margin-right-s")}
        onClick={handleLike}
      >
        <Icon
          onClick={onLike}
          iconColor={likeColor}
          backgroundColor={likeColor}
          type="like"
        />
      </button>
      <button
        disabled={disabled}
        ref={dislikeRef}
        className={styles.likeBtn}
        onClick={handleDislike}
      >
        <Icon
          onClick={onDislike}
          iconColor={dislikeColor}
          backgroundColor={dislikeColor}
          type="dislike"
        />
      </button>
      <Text size="small" className={styles.likesResult}>
        {likes}
      </Text>
    </div>
  );
};

Likes.propTypes = {
  likes: PropTypes.number,
  option: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  onLike: PropTypes.func,
  onDislike: PropTypes.func
};

Likes.defaultProps = {
  active: false
};

export default Likes;
