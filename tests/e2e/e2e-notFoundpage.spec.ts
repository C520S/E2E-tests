import { test } from "@playwright/test";
import { NotFoundPage } from "../../page-objects/NotFoundpage";


test.describe.parallel("Testing of the rendering of the 404 page", () => {
    //ilnitialize the HomePage
    let notFoundPage: NotFoundPage;
    test.beforeEach(async ({ page }) => {
      notFoundPage = new NotFoundPage(page);
      await notFoundPage.visit404page()
    });
    test("Checking the image of the notfoundpage", async () => {
        await notFoundPage.checkImage()
      });

      test("Checking the title of the notfoundpage", async () => {
        await notFoundPage.checkNotFoundPageTitle()
      }); 

      test("Checking the Phrase of the notfoundpage", async () => {
        await notFoundPage.checkNotFoundPagePhrase()
      });  
      test("Checking the homeButton of the notfoundpage", async () => {
        await notFoundPage.checkNotFoundPageHomeButton()
      });  
      test("Visual Reference testing for notfoundpage", async () => {
        await notFoundPage.checkRendering();
      });
  
  });