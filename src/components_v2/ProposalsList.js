import React from "react";

const ProposalsList = ({ data }) => {
  return (
    <div style={{ paddingTop: "100px" }}>
      {data.loading ? (
        <span>Loading Proposals</span>
      ) : (
        <ul>
          {data &&
            data.proposals &&
            data.proposals.map(({ name, censorshiprecord }) => (
              <li>
                {name} - {censorshiprecord.token}
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default ProposalsList;
