const { RESTDataSource } = require("apollo-datasource-rest");

class Politeiawww extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://localhost:4443/v1/";
  }

  async getVettedProposals() {
    const data = await this.get("proposals/vetted");
    return data.proposals;
  }
}

module.exports = Politeiawww;
