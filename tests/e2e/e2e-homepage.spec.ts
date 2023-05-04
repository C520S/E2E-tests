import { test } from "@playwright/test";
import { HomePage } from "../../page-objects/Homepage";

test.describe.parallel("Testing of the rendering of the home page", () => {
  //ilnitialize the HomePage
  let homePage: HomePage;
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    await homePage.visitHomepage();
  });

  test("Checking the title of the homepage", async () => {
    await homePage.checkHomepageTitle();
  });

  test("Check for the presence of the carousel element", async () => {
    await homePage.checkCarousel();
  });

  test("Check the content of the homepage introduction is correct", async () => {
    await homePage.checkContent();
  });

  test("Visual Reference testing for homepage", async () => {
    await homePage.checkRendering();
  });
});
