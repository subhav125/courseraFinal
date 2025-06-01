import {test, expect} from '@playwright/test';
import  input  from '../data/input.json'
import { HomePage } from '../page/home.js';
import { writeDataToOutput } from '../utils/writeData.js';

let output={};
//test scenario 2
test.describe.serial('TS_02 : Language and Levels',()=>{
    let homePage
    let page
    let output
    test.beforeAll(async ({browser})=>{
        const context = await browser.newContext();
        page = await context.newPage()
        homePage=new HomePage(page);
    })
    test("navigation",async ()=>{
        //navigate to the site
        await homePage.navigate("https://www.coursera.org/search?query=web%20development%20courses&sortBy=BEST_MATCH")
        //validation
        await expect(page.url()).toContain(input.url)
    })
    // test("searching",async ()=>{
    //     //search for the course
    //     await homePage.searchForCourse(input.course)
    //     //validation
    //     expect(await page.locator(homePage.searchedCourse).innerText()).toContain(input.course)
    // })
    // test("filtering the search",async ()=>{
    //     //selecting the course with only beginner level and english language
    //     await homePage.filter()
    //     //validation
    //     await expect(homePage.english_checked).toBeChecked()
    //     await expect(homePage.beginner_checked).toBeChecked()
    // })
    test("getting languages and levels",async ()=>{
        output = {
            //all available languages 
            languages: await homePage.lang(),
            //all the levels (eg: biginner, intermidiate, advance and mixed)
            levels: await homePage.levels()
        }
    })
    test("writing output in json",async ()=>{
        writeDataToOutput("TS_02_output",output)
    })
    test.afterAll(async()=>{
        await page.close()
    })
});

