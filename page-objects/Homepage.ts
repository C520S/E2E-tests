import {expect, Locator, Page } from "@playwright/test";
import fs from "fs";
const folderPath = " homePage-Test-Images";

export class HomePage {
  // define selectors
  readonly page: Page;
  readonly homepageTitle: Locator;
  readonly antCarousel: Locator;
  readonly contents: Locator;

  // Init selectors using constructor
  constructor(page: Page) {
    this.page = page;
    this.homepageTitle = page.locator("h1");
    this.antCarousel = page.locator("#panda-carousel");
    this.contents = page.locator("#my-content");
  }

  async visitHomepage() {
    await this.page.goto(
      "https://panda-helsinki-citybike-website.onrender.com/"
    );
  }

  async checkHomepageTitle() {
    await expect(this.homepageTitle).toHaveText(
      "Welcome to my Panda Helsinki Citybike website!"
    );
  }

  async checkCarousel() {
    await this.page.waitForLoadState("domcontentloaded");
    await expect(this.antCarousel).toBeVisible();
  }
  async checkContent() {
    await expect(this.contents).toHaveText(
      "Welcome to our website, where you can find comprehensive data on bike-share trips in the Helsinki and Espoo area for the month of May 2021. Our app provides a range of statistics on user trips, such as station addresses, capacity, number of pick-ups and drop-offs, and average distance between stations. Our easy-to-use table format allows you to easily compare statistics from different stations. We have also included a map showing the location of each station, so you can see the bike stations in their geographic context. Our aim is to provide an easy-to-use interface that allows you to access and explore the data effortlessly."
    );
  }

  async checkRendering() {
    await this.page.waitForLoadState("networkidle");
    // Create the folder if it doesn't exist
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    expect(await this.page.screenshot({ path: `${folderPath}/Homepage.png` }))
  }
}
