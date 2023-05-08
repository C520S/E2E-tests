import { expect, Locator, Page } from "@playwright/test";
import fs from "fs";
const folderPath = " stationListPage-Test-Images";


export class StationListPage {
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

      async checkTablesContent() {
    
        const table = await this.page.waitForSelector(".ant-table");
        const expectedTableDataset = ['Hanasaari 10 Espoo Hanaholmsstranden 1',
        'Keilalahti 28 Espoo Kägelviksvägen 2',
        'Westendinasema 16 Espoo Westendvägen 1',
        "Golfpolku 16 Espoo Golfstigen 3",
        'Revontulentie 30 Espoo Norrskensvägen 10',
        'Sateentie 18 Espoo Regnvägen 2',
        'Hakalehto 24 Espoo Havsvindsvägen 18',
        'Oravannahkatori 16 Espoo Gråskinnstorget 1',
        'Länsituuli 24 Espoo Västanvindsgränden 3',
        'Tuulimäki 18 Espoo Östanvindsgränden 11'
       
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
    await table.screenshot({ path: `${folderPath}/StationListTable_next_page.png` });
    // Click on the previous button
    await this.page.click(".ant-pagination-prev");
    await this.page.waitForTimeout(1000);
    await table.screenshot({ path: `${folderPath}/StationListTable_previous_page.png` });
  }
  async checkSearchResult(searchInpuut: string) {
    await this.page.waitForLoadState("networkidle");
    await this.searchField.type(searchInpuut);
    const expectedTableDataset = ['Golfpolku 16 Espoo Golfstigen 3'];
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


  }
  