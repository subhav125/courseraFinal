# Test info

- Name: TS_02 : Language and Levels >> navigation
- Location: C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\tests\TS_02.spec.js:17:9

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
   7 | //test scenario 2
   8 | test.describe.serial('TS_02 : Language and Levels',()=>{
   9 |     let homePage
  10 |     let page
  11 |     let output
  12 |     test.beforeAll(async ({browser})=>{
  13 |         const context = await browser.newContext();
  14 |         page = await context.newPage()
  15 |         homePage=new HomePage(page);
  16 |     })
> 17 |     test("navigation",async ()=>{
     |         ^ Error: browserType.launch: Executable doesn't exist at C:\Windows\system32\config\systemprofile\AppData\Local\ms-playwright\chromium_headless_shell-1169\chrome-win\headless_shell.exe
  18 |         //navigate to the site
  19 |         await homePage.navigate("https://www.coursera.org/search?query=web%20development%20courses&sortBy=BEST_MATCH")
  20 |         //validation
  21 |         await expect(page.url()).toContain(input.url)
  22 |     })
  23 |     // test("searching",async ()=>{
  24 |     //     //search for the course
  25 |     //     await homePage.searchForCourse(input.course)
  26 |     //     //validation
  27 |     //     expect(await page.locator(homePage.searchedCourse).innerText()).toContain(input.course)
  28 |     // })
  29 |     // test("filtering the search",async ()=>{
  30 |     //     //selecting the course with only beginner level and english language
  31 |     //     await homePage.filter()
  32 |     //     //validation
  33 |     //     await expect(homePage.english_checked).toBeChecked()
  34 |     //     await expect(homePage.beginner_checked).toBeChecked()
  35 |     // })
  36 |     test("getting languages and levels",async ()=>{
  37 |         output = {
  38 |             //all available languages 
  39 |             languages: await homePage.lang(),
  40 |             //all the levels (eg: biginner, intermidiate, advance and mixed)
  41 |             levels: await homePage.levels()
  42 |         }
  43 |     })
  44 |     test("writing output in json",async ()=>{
  45 |         writeDataToOutput("TS_02_output",output)
  46 |     })
  47 |     test.afterAll(async()=>{
  48 |         await page.close()
  49 |     })
  50 | });
  51 |
  52 |
```