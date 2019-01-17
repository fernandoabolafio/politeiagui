const { RESTDataSource } = require("apollo-datasource-rest");

class Politeiawww extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://localhost:4443/v1/";
  }

  willSendRequest(req) {
    req.headers.set("Cookie", this.context.cookie);
  }

  async getVettedProposals() {
    const data = await this.get("proposals/vetted");
    return data.proposals;
  }

  async getUnvettedProposals() {
    const data = await this.get("proposals/unvetted");
    return data.proposals;
  }
}

module.exports = Politeiawww;
