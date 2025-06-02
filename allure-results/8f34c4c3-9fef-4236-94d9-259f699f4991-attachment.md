# Test info

- Name: TS_01 : Web development Courses >> navigation
- Location: C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\tests\TS_01.spec.js:17:9

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
   4 | import { writeDataToOutput } from '../utils/writeData.js';
   5 |
   6 | let output={};
   7 | //test scenario 1 and 2
   8 | test.describe.serial('TS_01 : Web development Courses',()=>{
   9 |     let homePage
  10 |     let page
  11 |     let output
  12 |     test.beforeAll("creating page",async ({browser})=>{
  13 |         const context = await browser.newContext();
  14 |         page = await context.newPage()
  15 |         homePage=new HomePage(page);
  16 |     })
> 17 |     test("navigation",async ()=>{
     |         ^ Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
  18 |         //navigate to the site
  19 |         await homePage.navigate(input.url)
  20 |         //validation
  21 |         await expect(page.url()).toContain(input.url)
  22 |     })
  23 |     test("searching",async ()=>{
  24 |         //search for the course
  25 |         await homePage.searchForCourse(input.course)
  26 |         //validation
  27 |         expect(await page.locator(homePage.searchedCourse).innerText()).toContain(input.course)
  28 |     })
  29 |     test("filtering the search",async ()=>{
  30 |         //selecting the course with only beginner level and english language
  31 |         await homePage.filter()
  32 |         //validationgit 
  33 |         await expect(homePage.beginner_checked).toBeChecked()
  34 |     })
  35 |     test("storing output in object",async ()=>{
  36 |         output = {
  37 |             //course name, rating and duration
  38 |             courseDetails: await homePage.display(),
  39 |         }
  40 |     })
  41 |     test("writing output in json",async ()=>{
  42 |         writeDataToOutput("TS_01_output",output)
  43 |     })
  44 |     test.afterAll(async()=>{
  45 |         await page.close()
  46 |     })
  47 | });
  48 |
  49 |
```