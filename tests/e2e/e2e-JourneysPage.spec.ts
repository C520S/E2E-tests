import { test } from "@playwright/test";
import { Journeys } from "../../page-objects/JourneysPage";



test.describe.only("Testing of the rendering of the Journeyspage", () => {
    //ilnitialize thejourneysPage
    let journeysPage:Journeys;
    
    test.beforeEach(async ({ page }) => {
     journeysPage = new Journeys(page);
      await journeysPage.visitJourneyspage()
    });
  
   
    test("Checking the data in the table", async () => {
        await journeysPage.checkTablesContent()
      });
   
  });
  