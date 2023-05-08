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
  
    async visitStationListPage() {
      await this.page.goto(
        "https://panda-helsinki-citybike-website.onrender.com/stationList"
      );
      await this.page.waitForLoadState("networkidle");
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
  

  }
  