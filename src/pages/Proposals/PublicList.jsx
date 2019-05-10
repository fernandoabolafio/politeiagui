import React from "react";
import {  Sidebar, TopBanner, Main, PageDetails, SideBanner, H1 } from "pi-ui";

const PublicList = () => {
    return (
        <>
          <TopBanner >
            <PageDetails>
              <H1>Public Proposals</H1>
            </PageDetails>
            <SideBanner >
            </SideBanner>
          </TopBanner>
          <Sidebar>
            Sidebar
          </Sidebar>
          <Main >
            Main Content
          </Main>
        </>
      );
}

export default PublicList;