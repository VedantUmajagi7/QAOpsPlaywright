// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */

export default defineConfig({

  testDir: './tests',
  retries : 1,
  workers : 2,


  timeout: 30_000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,

        screenshot: 'on',
        trace: 'on',
        video: 'on',
        //...devices['Galaxy S24']
      }
    },
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,

        screenshot: 'off',
        trace: 'on',
        video: 'on',
        //viewport : {width:720,height:720}
      }
    },
  ]



});