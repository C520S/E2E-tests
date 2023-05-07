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
    const expectedTableDataset = 
        [
            
                'Laajalahden aukio 31/05/2021 Teljäntie 01/06/2021 2.04 km 8.33 min',
                'Töölöntulli 31/05/2021 Pasilan asema 01/06/2021 1.87 km 10.18 min',
                'Näkinsilta 31/05/2021 Vilhonvuorenkatu 01/06/2021 1.02 km 6.65 min',
                'Viiskulma 31/05/2021 Hernesaarenranta 01/06/2021 4.32 km 33.48 min',
                'Viiskulma 31/05/2021 Hernesaarenranta 01/06/2021 1.40 km 5.83 min',
                'Koskelan varikko 31/05/2021 Paavalinpuisto 01/06/2021 1.71 km 6.10 min',
                'Kansallismuseo 31/05/2021 Stenbäckinkatu 01/06/2021 2.55 km 22.95 min',
                'Viikin normaalikoulu 31/05/2021 Puotila (M) 01/06/2021 5.37 km 21.73 min',
                "Linnanmäki 31/05/2021 Brahen puistikko 01/06/2021 3.34 km 23.22 min",
                'Linnanmäki 31/05/2021 Pohjolankatu 01/06/2021 3.25 km 15.58 min',
                'Käpylän asema 31/05/2021 Oulunkylän asema 01/06/2021 1.63 km 11.20 min',
                'Kalevankatu 31/05/2021 Välimerenkatu 31/05/2021 1.13 km 5.75 min',
                'Käpylän asema 31/05/2021 Oulunkylän asema 31/05/2021 1.70 km 9.82 min',
                'Kalevankatu 31/05/2021 Välimerenkatu 31/05/2021 1.13 km 5.60 min',
                'Jämeräntaival 31/05/2021 Jämeräntaival 01/06/2021 1.23 km 50.67 min'
              
          ]
      
    const tableData = await table.$$eval("tbody tr", (rows) =>
      Array.from(rows, (row) =>
        Array.from(row.querySelectorAll("td"), (cell) => cell.innerText.trim())
      )
    );
 
    const tableDataContent = tableData.map(item => item.join(' '));
    console.log(tableDataContent);
    
    expect(tableDataContent).toEqual(expectedTableDataset)
    

  }
}
