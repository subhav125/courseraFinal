import {test, expect} from '@playwright/test';
import  input  from '../data/input.json'
import { HomePage } from '../page/home.js';
import { writeDataToOutput } from '../utils/writeData.js';

let output={};
//test scenario 1 and 2
test.describe.serial('TS_01 : Web development Courses',()=>{
    let homePage
    let page
    let output
    test.beforeAll("creating page",async ({browser})=>{
        const context = await browser.newContext();
        page = await context.newPage()
        homePage=new HomePage(page);
    })
    test("navigation",async ()=>{
        //navigate to the site
        await homePage.navigate(input.url)
        //validation
        await expect(page.url()).toContain(input.url)
    })
    test("searching",async ()=>{
        //search for the course
        await homePage.searchForCourse(input.course)
        //validation
        expect(await page.locator(homePage.searchedCourse).innerText()).toContain(input.course)
    })
    test("filtering the search",async ()=>{
        //selecting the course with only beginner level and english language
        await homePage.filter()
        //validationgit 
        await expect(homePage.beginner_checked).toBeChecked()
    })
    test("storing output in object",async ()=>{
        output = {
            //course name, rating and duration
            courseDetails: await homePage.display(),
        }
    })
    test("writing output in json",async ()=>{
        writeDataToOutput("TS_01_output",output)
    })
    test.afterAll(async()=>{
        await page.close()
    })
});

