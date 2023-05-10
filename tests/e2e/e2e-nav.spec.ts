import { test } from "@playwright/test";
import { Navigation } from "../../page-objects/Nav";


test.describe.parallel.only("Testing for correct navigation routing", () => {
    //ilnitialize the HomePage
    let navigation: Navigation;
    test.beforeEach(async ({ page }) => {
      navigation = new Navigation(page);
     
    });
  
    test("Checking the Url of the JourneyButton", async () => {
      await navigation.checkJourneyButton();
    });

    test("Checking the Url of the stationsButton", async () => {
       await navigation.checkStationButton()
      });

      test("Checking the Url of the HomeButton", async () => {
        await navigation.checkHomeButton()
       }); 
  
  });