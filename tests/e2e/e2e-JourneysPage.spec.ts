import { test } from "@playwright/test";
import { Journeys } from "../../page-objects/JourneysPage";



test.describe("Testing of the rendering of the Journeyspage", () => {
    //ilnitialize thejourneysPage
    let journeysPage:Journeys;
    
    test.beforeEach(async ({ page }) => {
     journeysPage = new Journeys(page);
      await journeysPage.visitJourneyspage()
    });
    test("Check if the table has 16 rows", async () => {
        await journeysPage.checkTableElements()
      });

   
    test("Checking the data in the table", async () => {
        await journeysPage.checkTablesContent()
      });

      test("Check table content pagination and visual testing", async () => {
        await journeysPage.checkTablePaging()
      });
      test("Check table Next and previous button and visual testing", async () => {
        await journeysPage.checkNextAndPreviousButton()
      });
      test("Checking the search function", async () => {
       await journeysPage.checkSearchResult('Töölön')
      });

      test.only("Checking the function of the return button", async () => {
        await journeysPage.checkBackButton()
       });

   
  });
  