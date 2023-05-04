import { PlaywrightTestConfig } from "@playwright/test";

// Define a configuration object for Playwright tests
const config: PlaywrightTestConfig = {
  // Set the test timeout to 60 seconds
  timeout: 60000,

  // Enable test retries with a maximum of 3 retries
  retries: 0,

  // Set the directory where test files are located
  testDir: "tests/e2e",

  // Define the options to use for each test run
  use: {
    // Run tests in headless mode (i.e. without a visible browser window)
    headless: true,

    // Set the viewport size to 1280x720
    viewport: {
      width: 1280,
      height: 720,
    },

    // Set the maximum time allowed for each test action to 10 seconds
    actionTimeout: 10000,

    // Ignore HTTPS errors when loading pages
    ignoreHTTPSErrors: true,

    // Disable video recording of test runs
    video: "off",

    // Take screenshots only when a test fails
    screenshot: "only-on-failure",
  },

  // Define the browsers to run the tests on
  projects: [
    {
      name: "Chromium",
      use: { browserName: "chromium" },
    },
    {
      name: "Firefox",
      use: { browserName: "firefox" },
    },
    {
      name: "Webkit",
      use: { browserName: "webkit" },
    },
  ],
};

export default config;
