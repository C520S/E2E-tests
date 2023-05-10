import { test } from "@playwright/test";

import { StationListPage } from "../../page-objects/StationList";

test.describe("Testing of the rendering of the station list and single station view page", () => {
  //ilnitialize the StationListPage
  let stationListPage: StationListPage;

  test.beforeEach(async ({ page }) => {
    stationListPage = new StationListPage(page);
    await stationListPage.visitStationListPage();
  });

  test("Check if the table has 11 rows", async () => {
    await stationListPage.checkTableElements();
  });

  test("Checking the data in the table", async () => {
    await stationListPage.checkTablesContent();
  });

  test("Check table content pagination and visual testing", async () => {
    await stationListPage.checkTablePaging();
  });

  test("Check table Next and previous button and visual testing", async () => {
    await stationListPage.checkNextAndPreviousButton();
  });

  test("Checking the search function", async () => {
    await stationListPage.checkSearchResult("Golf");
  });

  test("Checking the function of the return button", async () => {
    await stationListPage.checkBackButton();
  });

  test("checking single station view url", async () => {
    await stationListPage.checkSingleStationViewUrl();
  });

  test("checking single station view title", async () => {
    await stationListPage.checkSingleStationViewtitle();
  });

  test("checking single station view map component", async () => {
    await stationListPage.checkSingleStationViewMap();
  });

  test("Checking the function of the return button for a single station", async () => {
    await stationListPage.checkBackButtonForSingleStationView();
  });
  test("Check that the table in the single station view has 13 rows.", async () => {
    await stationListPage.checkTableElementsForSingleStationView();
  });
  test("Checking the data of a table on a single station view", async () => {
    await stationListPage.checkTablesContentForSingleStationView();
  });
});
