import { expect, Locator, Page } from "@playwright/test";
import axios from "axios";
import fs from "fs";
const folderPath = " stationListPage-Test-Images";

export class StationListPage {
  // define selectors
  readonly page: Page;
  readonly searchField: Locator;
  readonly backButton: Locator;
  readonly stationName: Locator;
  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator("#my-search");
    this.backButton = page.locator("text=back");
    this.stationName = page.locator("text=Mankkaanlaaksontie");
  }

  async visitStationListPage() {
    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/stationList"
    );
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
  }

  async checkTableElements() {
    const table = await this.page.waitForSelector(".ant-table");
    const trCountHandle = await this.page.evaluateHandle((table) => {
      const rows = table.querySelectorAll("tr");
      return rows.length;
    }, table);

    const trCount = await trCountHandle.jsonValue();

    expect(trCount).toEqual(11);
  }

  async checkTablesContent() {
    const table = await this.page.waitForSelector(".ant-table");

    const dataFromApi = await axios.get(
      `https://talented-visor-tick.cyclic.app/api/v1/stationList?page=1`
    );
    const stationListData = dataFromApi.data.data.stationListData;
    //Convert data types to strings inside an array
    const expectedTableDataset = stationListData.map((station: any) => {
      return `${station.nimi} ${station.kapasiteet} ${station.kaupunki} ${station.adress}`;
    });

    //extract the table data from the rows and cells of the Ant Design table.
    const tableData = await table.$$eval("tbody tr", (rows) =>
      Array.from(rows, (row) =>
        Array.from(row.querySelectorAll("td"), (cell) => cell.innerText.trim())
      )
    );

    const tableDataContent = tableData.map((item) => item.join(" "));

    expect(tableDataContent).toEqual(expectedTableDataset);
  }
  async checkTablePaging() {
    const table = await this.page.waitForSelector(".ant-table");
    // Get the pagination element
    const pagination = await this.page.waitForSelector(".ant-pagination");
    // Get the page numbers
    const pageNumbers = await pagination.$$eval(
      ".ant-pagination-item",
      (elements) => elements.map((el) => el.textContent)
    );

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    // Iterate through each page number and click on it
    for (const pageNumber of pageNumbers) {
      // Click on the page number
      await this.page.click(`.ant-pagination-item[title="${pageNumber}"]`);

      // Wait for the table to update with new data
      await this.page.waitForTimeout(1000);

      const screenshotPath = `${folderPath}/StationListTable_page_${pageNumber}.png`;
      //Take a screenshot of the table for visual verification
      await table.screenshot({ path: screenshotPath });
    }
  }

  async checkNextAndPreviousButton() {
    const table = await this.page.waitForSelector(".ant-table");

    // Click on the next button
    await this.page.click(".ant-pagination-next");
    await this.page.waitForTimeout(1000);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    await table.screenshot({
      path: `${folderPath}/StationListTable_next_page.png`,
    });
    // Click on the previous button
    await this.page.click(".ant-pagination-prev");
    await this.page.waitForTimeout(1000);
    await table.screenshot({
      path: `${folderPath}/StationListTable_previous_page.png`,
    });
  }

  async checkSearchResult(searchInpuut: string) {
    await this.page.waitForLoadState("networkidle");
    await this.searchField.type(searchInpuut);

    // keybord event in playwrights
    await this.page.keyboard.press("Enter");
    // Wait for the table to update with new data
    await this.page.waitForTimeout(3000);

    const table = await this.page.waitForSelector(".ant-table");
    const dataFromApi = await axios.get(
      `https://talented-visor-tick.cyclic.app/api/v1/stationList?page=1&search=${searchInpuut}`
    );
    const stationListData = dataFromApi.data.data.stationListData;
    //Convert data types to strings inside an array
    const expectedTableDataset = stationListData.map((station: any) => {
      return `${station.nimi} ${station.kapasiteet} ${station.kaupunki} ${station.adress}`;
    });

    //extract the table data from the rows and cells of the Ant Design table.
    const tableData = await table.$$eval("tbody tr", (rows) =>
      Array.from(rows, (row) =>
        Array.from(row.querySelectorAll("td"), (cell) => cell.innerText.trim())
      )
    );

    const tableDataContent = tableData.map((item) => item.join(" "));

    expect(tableDataContent).toEqual(expectedTableDataset);
  }

  async checkBackButton() {
    await this.backButton.click();
    const currentUrl = this.page.url();

    expect(currentUrl).toBe(
      "https://panda-helsinki-citybike-website.onrender.com/stationList"
    );
  }

  async checkSingleStationViewUrl() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    const currentUrl = this.page.url();

    expect(currentUrl).toBe(
      "https://panda-helsinki-citybike-website.onrender.com/stationList/Mankkaanlaaksontie"
    );
  }

  async checkSingleStationViewtitle() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    const pageTitle = this.page.locator("h2");
    await expect(pageTitle).toHaveText("Station location on the map");
  }

  async checkSingleStationViewMap() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    const mapComponent = this.page.locator("#panda-map");
    await expect(mapComponent).toBeVisible();
  }

  async checkBackButtonForSingleStationView() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    await this.backButton.click();
    const currentUrl = this.page.url();

    expect(currentUrl).toBe(
      "https://panda-helsinki-citybike-website.onrender.com/stationList"
    );
  }

  async checkTableElementsForSingleStationView() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    const table = await this.page.waitForSelector(".ant-table");
    const trCountHandle = await this.page.evaluateHandle((table) => {
      const rows = table.querySelectorAll("tr");
      return rows.length;
    }, table);
    const trCount = await trCountHandle.jsonValue();
    expect(trCount).toEqual(13);
  }

  async checkTablesContentForSingleStationView() {
    await this.stationName.click();
    await this.page.waitForLoadState("networkidle");
    await this.page.waitForTimeout(1000);
    const table = await this.page.waitForSelector(".ant-table");

    const dataFromApi = await axios.get(
      `https://talented-visor-tick.cyclic.app/api/v1/stationList/Mankkaanlaaksontie`
    );
    const singleStationData = dataFromApi.data.singleStationViewData;

    //Convert data types to strings inside an array
    const expectedTableDataset = [
      `Station identification code ${singleStationData[0].id}`,
      `Station name ${singleStationData[0].nimi}`,
      `Station address ${singleStationData[0].osoite}`,
      `City ${singleStationData[0].kaupunki}`,
      `Operators ${singleStationData[0].operaattor}`,
      `Bicycle Capacity ${singleStationData[0].kapasiteet}`,
      `Average distance from station ${(
        singleStationData[1].averageDistanceofstationDeparture / 1000
      ).toFixed(2)} km`,
      `Average distance to station ${(
        singleStationData[1].averageDistanceofstationArrival / 1000
      ).toFixed(2)} km`,
      `Total number of journeys starting from the station ${singleStationData[1].stationDepartureNum}`,
      `Total number of journeys ending at the station ${singleStationData[1].stationArrivalNum}`,
      `Top 5 most popular return stations for journeys starting from the station ${singleStationData[1].popular5start}`,
      `Top 5 most popular departure stations for journeys ending at the station ${singleStationData[1].popular5end}`,
    ];

    //extract the table data from the rows and cells of the Ant Design table.
    const tableData = await table.$$eval("tbody tr", (rows) =>
      Array.from(rows, (row) =>
        Array.from(row.querySelectorAll("td"), (cell) => cell.innerText.trim())
      )
    );

    const tableDataContent = tableData.map((item) => item.join(" "));

    expect(tableDataContent).toEqual(expectedTableDataset);
  }
}
