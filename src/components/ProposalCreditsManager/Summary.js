import React from "react";
import { CONFIRMATIONS_REQUIRED } from "../../constants";
import { exportToCsv, formatDate } from "../../helpers";
import DcrdataTxLink from "../DcrdataTxLink";

const exportData = (data) => {
  data = data.filter(d => !d.confirming)
    .map(d => ({
      ...d,
      datePurchased: formatDate(d.datePurchased)
    }));
  const fields = [ "numberPurchased", "price", "txId", "datePurchased" ];
  exportToCsv(data, fields);
};

const ProposalCreditsSummary = ({
  proposalCredits,
  proposalCreditPrice,
  proposalCreditPurchases,
  isTestnet,
  proposalPaywallPaymentTxid,
  proposalPaywallPaymentAmount,
  proposalPaywallPaymentConfirmations
}) => {
  if (proposalPaywallPaymentTxid) {
    const transaction = {
      numberPurchased: Math.round(proposalPaywallPaymentAmount * 1/(proposalCreditPrice * 100000000)),
      txId: proposalPaywallPaymentTxid,
      price: proposalCreditPrice,
      confirmations: proposalPaywallPaymentConfirmations,
      confirming: true,
      datePurchased: "just now"
    };
    proposalCreditPurchases.push(transaction);
  }
  const reverseProposalCreditPurchases = proposalCreditPurchases.slice(0).reverse();
  return (
    <div className="proposal-credits-summary">
      <div className="available-credits">
        <span> <b>Available credits:</b> {proposalCredits}</span>
        <div>
          <button
            className="inverse"
            onClick={() => exportData(proposalCreditPurchases)}
          >
            {"Export to CSV"}
          </button>
          <button
            className="inverse"
            onClick={() => null}
          >
            {"Scan"}
          </button>
        </div>
      </div>
      {proposalCreditPurchases && proposalCreditPurchases.length ? (
        <div className="credit-purchase-table">
          <div className="credit-purchase-header">
            <div className="credit-purchase-row">
              <div className="credit-purchase-cell credit-purchase-number">#</div>
              <div className="credit-purchase-cell credit-purchase-price">DCR per credit</div>
              <div className="credit-purchase-cell credit-purchase-tx">Transaction</div>
              <div className="credit-purchase-cell credit-purchase-status">Status</div>
              <div className="credit-purchase-cell credit-purchase-date">Date</div>
              <div className="clear"></div>
            </div>
          </div>
          <div className="credit-purchase-body">
            {reverseProposalCreditPurchases.map((creditPurchase, i) => (
              <div className="credit-purchase-row" key={i}>
                <div className="credit-purchase-cell credit-purchase-number">{creditPurchase.numberPurchased}</div>
                <div className="credit-purchase-cell credit-purchase-price">{creditPurchase.price} DCR</div>
                <div className="credit-purchase-cell credit-purchase-tx">
                  <DcrdataTxLink isTestnet={isTestnet} txId={creditPurchase.txId} />
                </div>
                <div className="credit-purchase-cell credit-purchase-status">
                  { creditPurchase.confirming ?
                    (<div className="user-proposal-credits-cell" style={{ color: "#ff8100", fontWeight: "bold" }}><div>
											Awaiting confirmations: </div>({creditPurchase.confirmations} of {CONFIRMATIONS_REQUIRED })</div>)
                    : <div style={{ fontWeight: "bold", color: "green" }}>Confirmed</div>
                  }
                </div>
                <div className="credit-purchase-cell credit-purchase-date-text">
                  {
                    creditPurchase.datePurchased ?
                      creditPurchase.datePurchased === "just now" ? "just now" :
                        formatDate(creditPurchase.datePurchased)
                      : ""
                  }
                </div>
                <div className="clear"></div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProposalCreditsSummary;
