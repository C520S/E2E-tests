import { expect, Locator, Page } from "@playwright/test";
import fs from "fs";
const folderPath = " StationListPage-Test-Images";


export class StationListPage {
    // define selectors
    readonly page: Page;
    readonly searchField: Locator;
    readonly backButton: Locator;
  
    // Init selectors using constructor
    constructor(page: Page) {
      this.page = page;
    
    }
  
    async visitHomepage() {
      await this.page.goto(
        "https://panda-helsinki-citybike-website.onrender.com/stationList"
      );
    }
  

  }
  