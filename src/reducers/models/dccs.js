import * as act from "src/actions/types";
import set from "lodash/fp/set";
import update from "lodash/fp/update";
import compose from "lodash/fp/compose";
import union from "lodash/fp/union";

const DEFAULT_STATE = {
  byToken: {},
  all: [],
  byStatus: {}
};

const dccToken = (dcc) => dcc.censorshiprecord.token;
const dccStatus = (dcc) => dcc.status;

const dccArrayToByTokenObject = (dccs) =>
  dccs.reduce(
    (dccsByToken, dcc) => ({
      ...dccsByToken,
      [dccToken(dcc)]: dcc
    }),
    {}
  );

const dccArrayToByStatusObject = (dccs) =>
  dccs.reduce(
    (dccsByStatus, dcc) => ({
      ...dccsByStatus,
      [dccStatus(dcc)]: [...(dccsByStatus[dccStatus(dcc)] || []), dcc]
    }),
    {}
  );

const onReceiveDccs = (state, receivedDccs) =>
  compose(
    update("byToken", (dccs) => ({
      ...dccs,
      ...dccArrayToByTokenObject(receivedDccs)
    })),
    update("all", union(receivedDccs.map(dccToken))),
    update("byStatus", (dccs) => ({
      ...dccs,
      ...dccArrayToByStatusObject(receivedDccs)
    }))
  )(state);

const onReceiveDcc = (state, receivedDcc) =>
  set(["byToken", dccToken(receivedDcc)], {
    ...receivedDcc
  })(state);

const onReceiveSupportOpposeDcc = (state, payload) => {
  const { token, userid, username, isSupport } = payload;

  const support = compose(
    update(["byToken", token, "supportuserids"], (supportids) => [
      ...supportids,
      userid
    ]),
    update(["byToken", token, "supportusernames"], (supportusernames) => [
      ...supportusernames,
      username
    ])
  );

  const oppose = compose(
    update(["byToken", token, "againstuserids"], (againstids) => [
      ...againstids,
      userid
    ]),
    update(["byToken", token, "againstusernames"], (againstusernames) => [
      ...againstusernames,
      username
    ])
  );
  return isSupport ? support(state) : oppose(state);
};

const dccs = (state = DEFAULT_STATE, action) =>
  action.error
    ? state
    : (
        {
          [act.RECEIVE_DCCS]: () => onReceiveDccs(state, action.payload.dccs),
          [act.RECEIVE_DCC]: () => onReceiveDcc(state, action.payload.dcc),
          [act.RECEIVE_SUPPORT_OPPOSE_DCC]: () =>
            onReceiveSupportOpposeDcc(state, action.payload)
        }[action.type] || (() => state)
      )();

export default dccs;