import {expect, Locator, Page } from "@playwright/test";
import fs from "fs";
const folderPath = " 404Page-Test-Images";

export class NotFoundPage {
  // define selectors
  readonly page: Page;
  readonly NotFoundPageImg: Locator;
  readonly NotFoundPageTitle: Locator;
  readonly NotFoundPagePhrase: Locator;
  readonly homeButton: Locator;
 

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.NotFoundPageImg = page.locator('.ant-image-img')
   
  }

  async visit404page() {
    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/404"
    );
    await this.page.waitForLoadState("networkidle");
  }
  

   async checkRendering() {
   // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    expect(await this.page.screenshot({ path: `${folderPath}/ NotFoundPage.png` }))
  }
}
