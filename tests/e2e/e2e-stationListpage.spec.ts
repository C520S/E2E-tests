import { test } from "@playwright/test";

import { StationListPage } from "../../page-objects/StationList";


test.describe("Testing of the rendering of the station list page", () => {
    
  //ilnitialize the StationListPage
  let stationListPage: StationListPage;

  test.beforeEach(async ({ page }) => {
    stationListPage = new StationListPage(page);
    await stationListPage.visitStationListPage()

  });

  test.only("Check if the table has  rows", async () => {
     await stationListPage.checkTableElements()
  });

});
  