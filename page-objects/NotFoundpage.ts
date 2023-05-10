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
    this.NotFoundPageTitle = page.locator('h1')
    this.NotFoundPagePhrase = page.locator('h2')
    this.homeButton=page.locator('text=Go Home')
   
  }

  async visit404page() {

    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/404"
    );

    await this.page.waitForLoadState("networkidle");
  }

  async checkImage(){

   await expect(this.NotFoundPageImg).toBeVisible();

  }

  async checkNotFoundPageTitle() {

    await expect(this.NotFoundPageTitle).toHaveText(
      "404"
    );
  }

  async checkNotFoundPagePhrase() {

    await expect(this.NotFoundPagePhrase).toHaveText(
      "Page Not Found"
    );
  }

  async checkNotFoundPageHomeButton() {
    
      await  this.homeButton.click()
      await this.page.waitForTimeout(4000);
      const currentUrl = this.page.url();

      expect(currentUrl).toBe(
        "https://panda-helsinki-citybike-website.onrender.com/"
      );
    
  }
 

   async checkRendering() {
   // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    expect(await this.page.screenshot({ path: `${folderPath}/ NotFoundPage.png` }))
  }
}
