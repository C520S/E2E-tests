import { expect, Locator, Page } from "@playwright/test";

export class Journeys {
  // define selectors
  readonly page: Page;
  readonly searchField: Locator;
  // readonly backButton :Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.searchField = page.locator("#my-search");
  }

  async visitJourneyspage() {
    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/journeys"
    );
  }

  async checkTablesContent() {
    await this.page.waitForLoadState("networkidle");
    const table = await this.page.waitForSelector(".ant-table");
    const tableData = await table.$$eval("tbody tr", (rows) =>
      Array.from(rows, (row) =>
        Array.from(row.querySelectorAll("td"), (cell) => cell.innerText.trim())
      )
    );
    console.log(tableData);
  }
}
