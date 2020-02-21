import * as act from "../../actions/types";
import {
  DEFAULT_REQUEST_STATE,
  receive,
  request,
  reset,
  resetMultiple
} from "../util";
import {
  onReceiveCensorInvoiceComment,
  onReceiveNewInvoiceComment,
  onReceivePayApprovedInvoices,
  onReceiveSetStatusInvoice,
  onReceiveDCCs,
  onSetDCC,
  onReceiveSupportOpposeDCC,
  onReceiveSetDCCStatus,
  onReceiveNewDccComment,
  onReceiveCensorDCCComment
} from "./handlersCMS";

export const DEFAULT_STATE = {
  me: DEFAULT_REQUEST_STATE,
  init: DEFAULT_REQUEST_STATE,
  policy: DEFAULT_REQUEST_STATE,
  newUser: DEFAULT_REQUEST_STATE,
  verifyNewUser: DEFAULT_REQUEST_STATE,
  login: DEFAULT_REQUEST_STATE,
  logout: DEFAULT_REQUEST_STATE,
  vetted: DEFAULT_REQUEST_STATE,
  unvetted: DEFAULT_REQUEST_STATE,
  censorComment: DEFAULT_REQUEST_STATE,
  proposal: DEFAULT_REQUEST_STATE,
  invoice: DEFAULT_REQUEST_STATE,
  userInvoices: DEFAULT_REQUEST_STATE,
  adminInvoices: DEFAULT_REQUEST_STATE,
  proposalComments: DEFAULT_REQUEST_STATE,
  invoiceComments: DEFAULT_REQUEST_STATE,
  proposalsVoteStatus: DEFAULT_REQUEST_STATE,
  proposalVoteStatus: DEFAULT_REQUEST_STATE,
  commentslikes: DEFAULT_REQUEST_STATE,
  userProposals: DEFAULT_REQUEST_STATE,
  newProposal: DEFAULT_REQUEST_STATE,
  userProposalCredits: DEFAULT_REQUEST_STATE,
  editProposal: DEFAULT_REQUEST_STATE,
  newComment: DEFAULT_REQUEST_STATE,
  forgottenPassword: DEFAULT_REQUEST_STATE,
  passwordReset: DEFAULT_REQUEST_STATE,
  changeUsername: DEFAULT_REQUEST_STATE,
  changePassword: DEFAULT_REQUEST_STATE,
  updateUserKey: DEFAULT_REQUEST_STATE,
  verifyUserKey: DEFAULT_REQUEST_STATE,
  likeComment: DEFAULT_REQUEST_STATE,
  unvettedStatus: DEFAULT_REQUEST_STATE,
  proposalPaywallPayment: DEFAULT_REQUEST_STATE,
  rescanUserPayments: DEFAULT_REQUEST_STATE,
  userSearch: DEFAULT_REQUEST_STATE,
  user: DEFAULT_REQUEST_STATE,
  proposalPaywallDetails: DEFAULT_REQUEST_STATE,
  email: "",
  keyMismatch: false,
  lastLoaded: {},
  newInvoice: DEFAULT_REQUEST_STATE,
  editInvoice: DEFAULT_REQUEST_STATE,
  payouts: DEFAULT_REQUEST_STATE,
  tokenInventory: DEFAULT_REQUEST_STATE,
  newDcc: DEFAULT_REQUEST_STATE,
  dccs: DEFAULT_REQUEST_STATE
};

const api = (state = DEFAULT_STATE, action) =>
  ((
    {
      [act.SET_EMAIL]: () => ({ ...state, email: action.payload }),
      [act.REQUEST_ME]: () => request("me", state, action),
      [act.RECEIVE_ME]: () => receive("me", state, action),
      [act.UPDATE_ME]: () => receive("me", state, action),
      [act.REQUEST_INIT_SESSION]: () => request("init", state, action),
      [act.RECEIVE_INIT_SESSION]: () => receive("init", state, action),
      [act.REQUEST_POLICY]: () => request("policy", state, action),
      [act.RECEIVE_POLICY]: () => receive("policy", state, action),
      [act.REQUEST_NEW_USER]: () => request("newUser", state, action),
      [act.RECEIVE_NEW_USER]: () => receive("newUser", state, action),
      [act.RESET_NEW_USER]: () => reset("newUser", state),
      [act.REQUEST_VERIFY_NEW_USER]: () =>
        request("verifyNewUser", state, action),
      [act.RECEIVE_VERIFY_NEW_USER]: () =>
        receive("verifyNewUser", state, action),
      [act.REQUEST_USER]: () => request("user", state, action),
      [act.RECEIVE_USER]: () => receive("user", state),
      [act.RESET_USER]: () => reset("user", state, action),
      [act.REQUEST_LOGIN]: () => request("login", state, action),
      [act.RECEIVE_LOGIN]: () => receive("login", state, action),
      [act.REQUEST_CHANGE_USERNAME]: () =>
        request("changeUsername", state, action),
      [act.RECEIVE_CHANGE_USERNAME]: () =>
        receive("changeUsername", state, action),
      [act.REQUEST_CHANGE_PASSWORD]: () =>
        request("changePassword", state, action),
      [act.RECEIVE_CHANGE_PASSWORD]: () =>
        receive("changePassword", state, action),
      [act.REQUEST_USER_PROPOSALS]: () =>
        request("userProposals", state, action),
      [act.RECEIVE_USER_PROPOSALS]: () => receive("userProposals", state),
      [act.REQUEST_TOKEN_INVENTORY]: () =>
        request("tokenInventory", state, action),
      [act.RECEIVE_TOKEN_INVENTORY]: () =>
        receive("tokenInventory", state, action),
      [act.REQUEST_PROPOSALS_BATCH]: () =>
        request("proposalsBatch", state, action),
      [act.RECEIVE_PROPOSALS_BATCH]: () => receive("proposalsBatch", state),
      [act.REQUEST_PROPOSAL]: () => request("proposal", state, action),
      [act.RECEIVE_PROPOSAL]: () => receive("proposal", state, action),
      [act.REQUEST_RECORD_COMMENTS]: () =>
        request("proposalComments", state, action),
      [act.RECEIVE_RECORD_COMMENTS]: () =>
        receive("proposalComments", state, action),
      [act.REQUEST_LIKE_COMMENT]: () => request("likeComment", state, action),
      [act.RECEIVE_LIKE_COMMENT]: () => receive("likeComment", state, action),
      [act.REQUEST_CENSOR_COMMENT]: () =>
        request("censorComment", state, action),
      [act.RECEIVE_CENSOR_COMMENT]: () => receive("censorComment", state),
      [act.REQUEST_LIKED_COMMENTS]: () =>
        request("commentslikes", state, action),
      [act.RECEIVE_LIKED_COMMENTS]: () =>
        receive("commentslikes", state, action),
      [act.REQUEST_EDIT_USER]: () => request("editUser", state, action),
      [act.RECEIVE_EDIT_USER]: () => receive("editUser", state, action),
      [act.RESET_EDIT_USER]: () => reset("editUser", state, action),
      [act.REQUEST_MANAGE_USER]: () => request("manageUser", state),
      [act.RECEIVE_MANAGE_USER]: () => receive("manageUser", state),
      [act.REQUEST_NEW_PROPOSAL]: () => request("newProposal", state, action),
      [act.RECEIVE_NEW_PROPOSAL]: () => receive("newProposal", state, action),
      [act.REQUEST_USER_SEARCH]: () => request("userSearch", state, action),
      [act.RECEIVE_USER_SEARCH]: () => receive("userSearch", state, action),
      [act.RESET_USER_SEARCH]: () => reset("userSearch", state, action),
      [act.REQUEST_EDIT_PROPOSAL]: () => request("editProposal", state, action),
      [act.RECEIVE_EDIT_PROPOSAL]: () => receive("editProposal", state, action),
      [act.REQUEST_NEW_COMMENT]: () => request("newComment", state, action),
      [act.RECEIVE_NEW_COMMENT]: () => receive("newComment", state),
      // == CMS START ==
      [act.REQUEST_INVITE_USER]: () => request("inviteUser", state, action),
      [act.RECEIVE_INVITE_USER]: () => receive("inviteUser", state, action),
      [act.RESET_INVITE_USER]: () => reset("inviteUser", state, action),
      [act.REQUEST_NEW_INVOICE]: () => request("newInvoice", state, action),
      [act.RECEIVE_NEW_INVOICE]: () => receive("newInvoice", state, action),
      [act.REQUEST_USER_INVOICES]: () => request("userInvoices", state, action),
      [act.RECEIVE_USER_INVOICES]: () => receive("userInvoices", state, action),
      [act.REQUEST_ADMIN_USER_INVOICES]: () =>
        request("userInvoices", state, action),
      [act.RECEIVE_ADMIN_USER_INVOICES]: () =>
        receive("userInvoices", state, action),
      [act.REQUEST_ADMIN_INVOICES]: () =>
        request("adminInvoices", state, action),
      [act.RECEIVE_ADMIN_INVOICES]: () =>
        receive("adminInvoices", state, action),
      [act.REQUEST_INVOICE]: () => request("invoice", state, action),
      [act.RECEIVE_INVOICE]: () => receive("invoice", state, action),
      [act.REQUEST_RECORD_COMMENTS]: () =>
        request("invoiceComments", state, action),
      [act.RECEIVE_RECORD_COMMENTS]: () =>
        receive("invoiceComments", state, action),
      [act.RECEIVE_NEW_INVOICE_COMMENT]: () =>
        onReceiveNewInvoiceComment(state, action),
      [act.RECEIVE_CENSOR_INVOICE_COMMENT]: () =>
        onReceiveCensorInvoiceComment(state, action),
      [act.REQUEST_SETSTATUS_INVOICE]: () =>
        request("setStatusInvoice", state, action),
      [act.RECEIVE_SETSTATUS_INVOICE]: () =>
        onReceiveSetStatusInvoice(state, action),
      [act.REQUEST_EDIT_INVOICE]: () => request("editInvoice", state, action),
      [act.RECEIVE_EDIT_INVOICE]: () => receive("editInvoice", state, action),
      [act.REQUEST_EXCHANGE_RATE]: () => request("exchangeRate", state, action),
      [act.RECEIVE_EXCHANGE_RATE]: () => receive("exchangeRate", state, action),
      [act.RESET_COMMENTS]: () =>
        resetMultiple(["proposalComments", "invoiceComments"], state),
      [act.REQUEST_MANAGE_CMS_USER]: () =>
        request("manageCmsUser", state, action),
      [act.REQUEST_USER_SUBCONTRACTORS]: () =>
        request("userSubcontractors", state, action),
      [act.RECEIVE_USER_SUBCONTRACTORS]: () =>
        receive("userSubcontractors", state, action),
      [act.REQUEST_NEW_DCC]: () => request("newDcc", state, action),
      [act.RECEIVE_NEW_DCC]: () => receive("newDcc", state, action),
      [act.REQUEST_DCCS]: () => request("dccs", state, action),
      [act.RECEIVE_DCCS]: () => onReceiveDCCs(state, action),
      [act.REQUEST_DCC]: () => request("dcc", state, action),
      [act.RECEIVE_DCC]: () => receive("dcc", state, action),
      [act.SET_DCC]: () => onSetDCC(state, action),
      [act.REQUEST_SUPPORT_OPPOSE_DCC]: () =>
        request("supportOpposeDCC", state, action),
      [act.RECEIVE_SUPPORT_OPPOSE_DCC]: () =>
        onReceiveSupportOpposeDCC(state, action),
      [act.REQUEST_SET_DCC_STATUS]: () =>
        request("setDCCStatus", state, action),
      [act.RECEIVE_SET_DCC_STATUS]: () => onReceiveSetDCCStatus(state, action),
      [act.REQUEST_DCC_COMMENTS]: () => request("dccComments", state, action),
      [act.RECEIVE_DCC_COMMENTS]: () => receive("dccComments", state, action),
      [act.RECEIVE_NEW_DCC_COMMENT]: () =>
        onReceiveNewDccComment(state, action),
      [act.RECEIVE_CENSOR_DCC_COMMENT]: () =>
        onReceiveCensorDCCComment(state, action),
      // === CMS END ===
      [act.REQUEST_PROPOSAL_PAYWALL_DETAILS]: () =>
        request("proposalPaywallDetails", state, action),
      [act.RECEIVE_PROPOSAL_PAYWALL_DETAILS]: () =>
        receive("proposalPaywallDetails", state, action),
      [act.REQUEST_UPDATE_PROPOSAL_CREDITS]: () =>
        request("updateProposalCredits", state, action),
      [act.RECEIVE_UPDATE_PROPOSAL_CREDITS]: () =>
        receive("updateProposalCredits", state, action),
      [act.REQUEST_USER_PROPOSAL_CREDITS]: () =>
        request("userProposalCredits", state, action),
      [act.RECEIVE_USER_PROPOSAL_CREDITS]: () =>
        receive("userProposalCredits", state, action),
      [act.REQUEST_FORGOTTEN_PASSWORD_REQUEST]: () =>
        request("forgottenPassword", state, action),
      [act.RECEIVE_FORGOTTEN_PASSWORD_REQUEST]: () =>
        receive("forgottenPassword", state, action),
      [act.RESET_FORGOTTEN_PASSWORD_REQUEST]: () =>
        reset("forgottenPassword", state),
      [act.REQUEST_RESET_PASSWORD]: () =>
        request("resetPassword", state, action),
      [act.RECEIVE_RESET_PASSWORD]: () =>
        receive("resetPassword", state, action),
      [act.REQUEST_VERIFY_RESET_PASSWORD]: () =>
        request("verifyResetPassword", state, action),
      [act.RECEIVE_VERIFY_RESET_PASSWORD]: () =>
        receive("verifyResetPassword", state, action),
      [act.RESET_RESET_PASSWORD]: () =>
        resetMultiple(["resetPassword", "verifyResetPassword"], state),
      [act.REQUEST_RESEND_VERIFICATION_EMAIL]: () =>
        request("resendVerificationEmail", state, action),
      [act.RECEIVE_RESEND_VERIFICATION_EMAIL]: () =>
        receive("resendVerificationEmail", state, action),
      [act.RESET_RESEND_VERIFICATION_EMAIL]: () =>
        reset("resendVerificationEmail", state),
      [act.REQUEST_PASSWORD_RESET_REQUEST]: () =>
        request("passwordReset", state, action),
      [act.RECEIVE_PASSWORD_RESET_REQUEST]: () =>
        receive("passwordReset", state, action),
      [act.REQUEST_SETSTATUS_PROPOSAL]: () =>
        request("setStatusProposal", state, action),
      [act.RECEIVE_SETSTATUS_PROPOSAL]: () =>
        receive("setStatusProposal", state),
      [act.RECEIVE_START_VOTE]: () => receive("startVote", state),
      [act.REQUEST_START_VOTE]: () => request("startVote", state, action),
      [act.REQUEST_UPDATED_KEY]: () => request("updateUserKey", state, action),
      [act.RECEIVE_UPDATED_KEY]: () => receive("updateUserKey", state, action),
      [act.REQUEST_VERIFIED_KEY]: () => request("verifyUserKey", state, action),
      [act.RECEIVE_VERIFIED_KEY]: () => receive("verifyUserKey", state, action),
      [act.KEY_MISMATCH]: () => ({ ...state, keyMismatch: action.payload }),
      [act.REQUEST_LOGOUT]: () => request("logout", state, action),
      [act.REQUEST_PROPOSALS_VOTE_SUMMARY]: () =>
        request("proposalsVoteSummary", state, action),
      [act.RECEIVE_PROPOSALS_VOTE_SUMMARY]: () =>
        receive("proposalsVoteSummary", state, {}),
      [act.REQUEST_PROPOSAL_VOTE_RESULTS]: () =>
        request("proposalVoteResults", state, action),
      [act.RECEIVE_PROPOSAL_VOTE_RESULTS]: () =>
        receive("proposalVoteResults", state, {}),
      [act.REQUEST_AUTHORIZE_VOTE]: () =>
        request("authorizeVote", state, action),
      [act.RECEIVE_AUTHORIZE_VOTE]: () => receive("authorizeVote", state, {}),
      [act.REQUEST_REVOKE_AUTH_VOTE]: () =>
        request("authorizeVote", state, action),
      [act.RECEIVE_REVOKE_AUTH_VOTE]: () => receive("authorizeVote", state, {}),
      [act.REQUEST_PROPOSAL_PAYWALL_PAYMENT]: () =>
        request("proposalPaywallPayment", state, action),
      [act.RECEIVE_PROPOSAL_PAYWALL_PAYMENT]: () =>
        receive("proposalPaywallPayment", state, action),
      [act.REQUEST_RESCAN_USER_PAYMENTS]: () =>
        request("rescanUserPayments", state, action),
      [act.RECEIVE_RESCAN_USER_PAYMENTS]: () =>
        receive("rescanUserPayments", state, {}),
      [act.RESET_RESCAN_USER_PAYMENTS]: () =>
        reset("rescanUserPayments", state, action),
      [act.REQUEST_GENERATE_PAYOUTS]: () => request("payouts", state, action),
      [act.RECEIVE_GENERATE_PAYOUTS]: () => receive("payouts", state, action),
      [act.REQUEST_INVOICE_PAYOUTS]: () =>
        request("invoicePayouts", state, action),
      [act.RECEIVE_INVOICE_PAYOUTS]: () =>
        receive("invoicePayouts", state, action),
      [act.REQUEST_PAY_APPROVED]: () => request("payApproved", state, action),
      [act.RECEIVE_PAY_APPROVED]: () =>
        onReceivePayApprovedInvoices(state, action),
      [act.RECEIVE_LOGOUT]: () => {
        if (!action.error) {
          return {
            ...state,
            me: DEFAULT_REQUEST_STATE,
            logout: DEFAULT_REQUEST_STATE,
            login: DEFAULT_REQUEST_STATE,
            verifyNewUser: DEFAULT_REQUEST_STATE,
            passwordReset: DEFAULT_REQUEST_STATE,
            changePassword: DEFAULT_REQUEST_STATE,
            verifyUserKey: DEFAULT_REQUEST_STATE,
            proposalPaywallPayment: DEFAULT_REQUEST_STATE,
            proposalPaywallDetails: DEFAULT_REQUEST_STATE,
            rescanUserPayments: DEFAULT_REQUEST_STATE,
            unvetted: DEFAULT_REQUEST_STATE,
            userProposalCredits: DEFAULT_REQUEST_STATE
          };
        }
        return receive("logout", state, action);
      }
    }[action.type] || (() => state)
  )());

export default api;
