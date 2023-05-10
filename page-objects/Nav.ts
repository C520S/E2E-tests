import {expect, Locator, Page } from "@playwright/test";




export class Navigation {
    // define selectors
    readonly page: Page;
    readonly homeButton: Locator;
    readonly journeysButton: Locator;
    readonly stationButton: Locator;
  
    // Init selectors using constructor
    constructor(page: Page) {
      this.page = page;
      this.homeButton = page.locator("text=Home");
      this.journeysButton= page.locator("text=Journeys");
      this.stationButton = page.locator("text=Station List");
    }
  
    async checkJourneyButton() {
      await this.page.goto(
        "https://panda-helsinki-citybike-website.onrender.com/"
      );
      await this.page.waitForLoadState("domcontentloaded");
      await this.journeysButton.click()
      const currentUrl = this.page.url();

      expect(currentUrl).toBe(
        "https://panda-helsinki-citybike-website.onrender.com/journeys"
      );
    }

    async checkStationButton() {
        await this.page.goto(
          "https://panda-helsinki-citybike-website.onrender.com/"
        );
        await this.page.waitForLoadState("domcontentloaded");
       
        await this.stationButton.click()
        const currentUrl = this.page.url();
  
        expect(currentUrl).toBe(
          "https://panda-helsinki-citybike-website.onrender.com/stationList"
        );
      }
     
      async checkHomeButton() {
        await this.page.goto(
          "https://panda-helsinki-citybike-website.onrender.com/stationList"
        );
        await this.page.waitForLoadState("domcontentloaded");
       
        await this.homeButton.click()
        const currentUrl = this.page.url();
  
        expect(currentUrl).toBe(
          "https://panda-helsinki-citybike-website.onrender.com/"
        );
      }

  
  
  }