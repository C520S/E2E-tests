import { expect, Locator, Page } from "@playwright/test";
import fs from "fs";
const folderPath = " JourneyPage-Test-Images";

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
  }

  async checkTableElements() {
    await this.page.waitForLoadState("networkidle");
    const table = await this.page.waitForSelector(".ant-table");
    const trCountHandle = await this.page.evaluateHandle((table) => {
      const rows = table.querySelectorAll("tr");
      return rows.length;
    }, table);
    const trCount = await trCountHandle.jsonValue();
    expect(trCount).toEqual(16);
  }

  async checkTablesContent() {
    await this.page.waitForLoadState("networkidle");
    const table = await this.page.waitForSelector(".ant-table");
    const expectedTableDataset = [
      "Laajalahden aukio 31/05/2021 Teljäntie 01/06/2021 2.04 km 8.33 min",
      "Töölöntulli 31/05/2021 Pasilan asema 01/06/2021 1.87 km 10.18 min",
      "Näkinsilta 31/05/2021 Vilhonvuorenkatu 01/06/2021 1.02 km 6.65 min",
      "Viiskulma 31/05/2021 Hernesaarenranta 01/06/2021 4.32 km 33.48 min",
      "Viiskulma 31/05/2021 Hernesaarenranta 01/06/2021 1.40 km 5.83 min",
      "Koskelan varikko 31/05/2021 Paavalinpuisto 01/06/2021 1.71 km 6.10 min",
      "Kansallismuseo 31/05/2021 Stenbäckinkatu 01/06/2021 2.55 km 22.95 min",
      "Viikin normaalikoulu 31/05/2021 Puotila (M) 01/06/2021 5.37 km 21.73 min",
      "Linnanmäki 31/05/2021 Brahen puistikko 01/06/2021 3.34 km 23.22 min",
      "Linnanmäki 31/05/2021 Pohjolankatu 01/06/2021 3.25 km 15.58 min",
      "Käpylän asema 31/05/2021 Oulunkylän asema 01/06/2021 1.63 km 11.20 min",
      "Kalevankatu 31/05/2021 Välimerenkatu 31/05/2021 1.13 km 5.75 min",
      "Käpylän asema 31/05/2021 Oulunkylän asema 31/05/2021 1.70 km 9.82 min",
      "Kalevankatu 31/05/2021 Välimerenkatu 31/05/2021 1.13 km 5.60 min",
      "Jämeräntaival 31/05/2021 Jämeräntaival 01/06/2021 1.23 km 50.67 min",
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

  async checkTablePaging() {
    await this.page.waitForLoadState("networkidle");
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

      const screenshotPath = `${folderPath}/table_page_${pageNumber}.png`;
      //Take a screenshot of the table for visual verification
      await table.screenshot({ path: screenshotPath });
    }
  }

  async checkNextAndPreviousButton() {
    await this.page.waitForLoadState("networkidle");
    const table = await this.page.waitForSelector(".ant-table");

    // Click on the next button
    await this.page.click(".ant-pagination-next");
    await this.page.waitForTimeout(1000);

    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    await table.screenshot({ path: `${folderPath}/table_next_page.png` });
    // Click on the previous button
    await this.page.click(".ant-pagination-prev");
    await this.page.waitForTimeout(1000);
    await table.screenshot({ path: `${folderPath}/table_previous_page.png` });
  }

  async checkSearchResult(searchInpuut: string) {
    await this.page.waitForLoadState("networkidle");
    await this.searchField.type(searchInpuut);
    const expectedTableDataset = [
      "Töölöntulli 31/05/2021 Pasilan asema 01/06/2021 1.87 km 10.18 min",
      "Töölönlahdenkatu 31/05/2021 Kansallismuseo 01/06/2021 0.55 km 4.03 min",
      "Töölöntulli 31/05/2021 Paciuksenkatu 31/05/2021 0.67 km 2.65 min",
      "Töölönkatu 31/05/2021 Brahen kenttä 31/05/2021 2.08 km 10.47 min",
      "Töölönlahdenkatu 31/05/2021 Ooppera 31/05/2021 1.68 km 6.55 min",
      "Töölönkatu 31/05/2021 Liisanpuistikko 31/05/2021 2.58 km 12.93 min",
      "Töölöntulli 31/05/2021 Brahen kenttä 31/05/2021 2.62 km 10.42 min",
      "Töölönlahden puisto 31/05/2021 Tyynenmerenkatu 31/05/2021 2.38 km 12.83 min",
      "Töölönlahden puisto 31/05/2021 Heikkiläntie 31/05/2021 3.74 km 15.20 min",
      "Töölönkatu 31/05/2021 Albertinkatu 31/05/2021 2.25 km 12.95 min",
      "Töölöntori 31/05/2021 Kaivopuisto 31/05/2021 5.86 km 26.58 min",
      "Töölöntulli 31/05/2021 Tenholantie 31/05/2021 1.52 km 7.78 min",
      "Töölönlahden puisto 31/05/2021 Maistraatintori 31/05/2021 3.13 km 9.93 min",
      "Töölöntulli 31/05/2021 Laivalahden puistotie 31/05/2021 7.31 km 33.68 min",
      "Töölöntori 31/05/2021 Erottajan aukio 31/05/2021 1.77 km 8.63 min",
    ];
    // keybord event in playwrights
    await this.page.keyboard.press("Enter");
    // Wait for the table to update with new data
    await this.page.waitForTimeout(3000);

    const table = await this.page.waitForSelector(".ant-table");

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
    await this.page.waitForLoadState("networkidle");
    await this.backButton.click();
    const currentUrl = this.page.url();

    expect(currentUrl).toBe(
      "https://panda-helsinki-citybike-website.onrender.com/journeys"
    );
  }
}
