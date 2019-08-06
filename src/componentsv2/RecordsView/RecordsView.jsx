import React, { useState, useEffect, useReducer } from "react";
import { Tabs, Tab } from "pi-ui";
import LazyList from "src/components/LazyList/LazyList";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { getRecordsByTabOption } from "./helpers";
import useQueryStringWithIndexValue from "src/hooks/utils/useQueryStringWithIndexValue";

const DEFAULT_PAGE_SIZE = 4;

const LoadingPlaceholders = ({ numberOfItems, placeholder }) => {
  const Item = placeholder;
  const placeholders = [];
  for (let i = 0; i < numberOfItems; i++) {
    placeholders.push(<Item key={`placeholder-${i}`} />);
  }
  return <>{placeholders}</>;
};

const initialState = { itemsOnLoad: 0 };

const INCREMENT_LOADING_ITEMS = "increment";
const DECREMENT_LOADING_ITEMS = "decrement";

function reducer(state, action) {
  switch (action.type) {
    case INCREMENT_LOADING_ITEMS:
      return { itemsOnLoad: state.itemsOnLoad + action.count };
    case DECREMENT_LOADING_ITEMS:
      return { itemsOnLoad: state.itemsOnLoad - action.count };
    default:
      throw new Error();
  }
}

const RecordsView = ({
  children,
  onFetchRecords,
  records,
  tabLabels,
  recordTokensByTab,
  renderRecord,
  displayTabCount,
  pageSize = DEFAULT_PAGE_SIZE,
  placeholder
}) => {
  const [hasMoreToLoad, setHasMore] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const { itemsOnLoad } = state;

  const [index, onSetIndex] = useQueryStringWithIndexValue("tab", 0, tabLabels);
  const tabOption = tabLabels[index];

  const filteredTokens = recordTokensByTab[tabOption];

  const filteredRecords = getRecordsByTabOption(
    tabOption,
    records,
    filteredTokens
  );

  const handleFetchMoreRecords = async () => {
    try {
      const index = filteredRecords.length;
      const recordTokensToBeFetched = filteredTokens.slice(
        index,
        index + pageSize
      );
      setHasMore(false);
      const numOfItemsToBeFetched = recordTokensToBeFetched.length;
      dispatch({ type: INCREMENT_LOADING_ITEMS, count: numOfItemsToBeFetched });
      await onFetchRecords(recordTokensToBeFetched);
      dispatch({ type: DECREMENT_LOADING_ITEMS, count: numOfItemsToBeFetched });
    } catch (e) {
      throw e;
    }
  };

  useEffect(() => {
    const hasMoreRecordsToLoad =
      filteredTokens && filteredRecords.length < filteredTokens.length;
    setHasMore(hasMoreRecordsToLoad);
  }, [filteredTokens, filteredRecords.length]);

  const getPropsCountByTab = tab => {
    if (!recordTokensByTab) return "";
    return recordTokensByTab[tab].length;
  };

  return children({
    tabs: (
      <Tabs onSelectTab={onSetIndex} activeTabIndex={index}>
        {tabLabels.map(label => (
          <Tab
            key={`tab-${label}`}
            count={displayTabCount ? getPropsCountByTab(label) : ""}
            label={label}
          />
        ))}
      </Tabs>
    ),
    content: (
      <TransitionGroup>
        <CSSTransition key={index} classNames="fade" timeout={200}>
          <LazyList
            items={filteredRecords}
            renderItem={renderRecord}
            onFetchMore={handleFetchMoreRecords}
            hasMore={hasMoreToLoad}
            isLoading={itemsOnLoad > 0}
            loadingPlaceholder={
              <LoadingPlaceholders
                numberOfItems={itemsOnLoad}
                placeholder={placeholder}
              />
            }
          />
        </CSSTransition>
      </TransitionGroup>
    )
  });
};

export default RecordsView;
