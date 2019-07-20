import orderBy from "lodash/fp/orderBy";

export const commentSortOptions = {
  SORT_BY_TOP: "Top",
  SORT_BY_OLD: "Old",
  SORT_BY_NEW: "New"
};

/**
 * Creates a select option from a string sort option.
 * @param {String} sortOption
 * @returns {Object} selectOption
 */
export const createSelectOptionFromSortOption = sortOption => ({
  label: sortOption,
  value: sortOption
});

/**
 * Return the sort select options.
 * @returns {Array} sortSelectOptions
 */
export const getSortOptionsForSelect = () =>
  Object.keys(commentSortOptions).map(key =>
    createSelectOptionFromSortOption(commentSortOptions[key])
  );

/** Estimates the number of top level comments for a given total number
 *  of comments.The formula '6 log (0.2 totalComments)' is a more precise
 *  estimative of how many top level comments exists. This formula was
 *  created after analyzing the data from proposals.decred.org.
 * @param {number} totalComments
 * @returns {number} numOfTopLevelComments
 */
export const estimateNumberOfTopLevelComments = totalComments => {
  if (totalComments < 7) {
    return Math.round(totalComments / 2);
  }
  return Math.round(6 * Math.log(0.2 * totalComments));
};

/**
 * Returns a sort function accordingly to the sort option provided
 * @param {String} sortOption
 * @returns {Function} sorterFunction
 */
export const getSort = sortOption => {
  const mapOptionToSort = {
    [commentSortOptions.SORT_BY_NEW]: orderBy(["timestamp"], ["desc"]),
    [commentSortOptions.SORT_BY_OLD]: orderBy(["timestamp"], ["asc"]),
    [commentSortOptions.SORT_BY_TOP]: orderBy(
      ["resultvotes", "timestamp"],
      ["desc", "desc"]
    )
  };

  return (
    mapOptionToSort[sortOption] ||
    mapOptionToSort[commentSortOptions.SORT_BY_TOP]
  );
};
