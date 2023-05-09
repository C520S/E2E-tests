import { expect, Locator, Page } from "@playwright/test";
import axios from "axios";
import fs from "fs";
const folderPath = " journeyPage-Test-Images";

export class Journeys {
  // define selectors
  readonly page: Page;
  readonly searchField: Locator;
  readonly backButton: Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator("#my-search");
    this.backButton = page.locator("text=back");
  }

  async visitJourneyspage() {
    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/journeys"
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
    expect(trCount).toEqual(16);
  }

  async checkTablesContent() {
    
    const table = await this.page.waitForSelector(".ant-table");
    const dataFromApi = await axios.get(
      `https://talented-visor-tick.cyclic.app/api/v1/journeys?page=1`
    );

    const journeysData = dataFromApi.data.data.journeysData;
    //Convert data types to strings inside an array
    const expectedTableDataset = journeysData.map((journey:any) => {
      const departureDate = new Date(journey.departureTime).toLocaleDateString();
      const returnDate = new Date(journey.returnTime).toLocaleDateString();
      const coveredDistance = (journey.coveredDistance / 1000).toFixed(2);
      const durationMinutes = (journey.duration / 60).toFixed(2);
    
      const formattedJourney = `${journey.departureStationName} ${departureDate} ${journey.returnStationName} ${returnDate} ${coveredDistance} km ${durationMinutes} min`;
      return formattedJourney;
    })
   
 
    
    
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

      const screenshotPath = `${folderPath}/JourneysTable_page_${pageNumber}.png`;
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
    await table.screenshot({ path: `${folderPath}/JourneysTable_next_page.png` });
    // Click on the previous button
    await this.page.click(".ant-pagination-prev");
    await this.page.waitForTimeout(1000);
    await table.screenshot({ path: `${folderPath}/JourneysTable_previous_page.png` });
  }

  async checkSearchResult(searchInpuut: string) {
  
    await this.searchField.type(searchInpuut);
    // keybord event in playwrights
    await this.page.keyboard.press("Enter");
    // Wait for the table to update with new data
    await this.page.waitForTimeout(3000);
    
   
    const table = await this.page.waitForSelector(".ant-table");
    const dataFromApi = await axios.get(
      `https://talented-visor-tick.cyclic.app/api/v1/journeys?page=1&search=${searchInpuut}`
    );

    const journeysData = dataFromApi.data.data.journeysData;
    //Convert data types to strings inside an array
    const expectedTableDataset = journeysData.map((journey:any) => {
      const departureDate = new Date(journey.departureTime).toLocaleDateString();
      const returnDate = new Date(journey.returnTime).toLocaleDateString();
      const coveredDistance = (journey.coveredDistance / 1000).toFixed(2);
      const durationMinutes = (journey.duration / 60).toFixed(2);
    
      const formattedJourney = `${journey.departureStationName} ${departureDate} ${journey.returnStationName} ${returnDate} ${coveredDistance} km ${durationMinutes} min`;
      return formattedJourney;
    })
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
      "https://panda-helsinki-citybike-website.onrender.com/journeys"
    );
  }
}
