import { test } from "@playwright/test";

import { StationListPage } from "../../page-objects/StationList";


test.describe("Testing of the rendering of the station list page", () => {
    
  //ilnitialize the StationListPage
  let stationListPage: StationListPage;

  test.beforeEach(async ({ page }) => {
    stationListPage = new StationListPage(page);
    await stationListPage.visitStationListPage()

  });

  test("Check if the table has 11 rows", async () => {
     await stationListPage.checkTableElements()
  });

  test("Checking the data in the table", async () => {
    await stationListPage.checkTablesContent();
  });

  
  test("Check table content pagination and visual testing", async () => {
    await stationListPage.checkTablePaging();
  });

});
  