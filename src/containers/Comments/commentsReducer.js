import { getSort } from "./helpers";
import isEqual from "lodash/isEqual";
import maxBy from "lodash/maxBy";

export const initialState = { comments: [] };

export const actions = {
  SORT: "sort",
  UPDATE: "update"
};

export const commentsReducer = (state, action) => {
  switch (action.type) {
    case actions.SORT: {
      const sorter = getSort(action.sortOption);
      return { ...state, comments: sorter(state.comments) };
    }

    case actions.UPDATE: {
      // first update: simply add the comments into the state
      if (!state.comments.length) {
        return {
          ...state,
          comments: action.comments
        };
      }
      // new comment added: find the new comment and add it to the state
      if (action.comments.length > state.comments.length) {
        const addedComment = maxBy(action.comments, c => +c.commentid);
        return {
          ...state,
          comments: state.comments.concat([addedComment])
        };
      }
      // comment updated: find and update the comments with changes
      return {
        ...state,
        comments: state.comments.map(comment => {
          const commentFromNewComments = action.comments.find(
            c => c.commentid === comment.commentid
          );
          if (!isEqual(comment, commentFromNewComments)) {
            return commentFromNewComments;
          }
          return comment;
        })
      };
    }

    default:
      return state;
  }
};
