# Test info

- Name: TS_03 : Enterprise >> navigation
- Location: C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\tests\TS_03.spec.js:20:9

# Error details

```
Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test';
   2 | import  input  from '../data/input.json'
   3 | import { HomePage } from '../page/home.js';
   4 | import { Form } from '../page/form.js';
   5 | import { writeDataToOutput } from '../utils/writeData.js';
   6 |
   7 | let output={};
   8 | //test scenario 2
   9 | test.describe.serial('TS_03 : Enterprise',()=>{
  10 |     let homePage
  11 |     let enterprisePage
  12 |     let page
  13 |     let output
  14 |     test.beforeAll("creating page",async ({browser})=>{
  15 |         const context = await browser.newContext();
  16 |         page = await context.newPage()
  17 |         homePage=new HomePage(page);
  18 |         enterprisePage=new Form(page);
  19 |     })
> 20 |     test("navigation",async ()=>{
     |         ^ Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
  21 |         //navigate to the site
  22 |         await homePage.navigate(input.url)
  23 |         //validation
  24 |         await expect(page.url()).toContain(input.url)
  25 |         //going to the enterprise section
  26 |         await enterprisePage.clickForEnterprise()
  27 |     })
  28 |     test('filling details', async () =>{
  29 |         //filling the form with the data from the input.json
  30 |         await enterprisePage.filldetails(input)
  31 |     })
  32 |     test("capturing the Error", async ()=>{
  33 |         //leaving the email field blank and submitting the form and capturing the error
  34 |         await enterprisePage.submit()
  35 |         const error = await enterprisePage.getTheError()
  36 |         //storing the error in output as an object
  37 |         output={
  38 |             error:error
  39 |         }
  40 |     })
  41 |     test("writing output in json",async ()=>{
  42 |         //writing output in json
  43 |         writeDataToOutput("TS_03_output",output)
  44 |     })
  45 |     test.afterAll(async()=>{
  46 |         await page.close()
  47 |     })
  48 | });
  49 |
  50 |
```