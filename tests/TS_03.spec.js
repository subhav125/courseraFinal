import {test, expect} from '@playwright/test';
import  input  from '../data/input.json'
import { HomePage } from '../page/home.js';
import { Form } from '../page/form.js';
import { writeDataToOutput } from '../utils/writeData.js';

let output={};
//test scenario 2
test.describe.serial('TS_03 : Enterprise',()=>{
    let homePage
    let enterprisePage
    let page
    let output
    test.beforeAll("creating page",async ({browser})=>{
        const context = await browser.newContext();
        page = await context.newPage()
        homePage=new HomePage(page);
        enterprisePage=new Form(page);
    })
    test("navigation",async ()=>{
        //navigate to the site
        await homePage.navigate(input.url)
        //validation
        await expect(page.url()).toContain(input.url)
        //going to the enterprise section
        await enterprisePage.clickForEnterprise()
    })
    test('filling details', async () =>{
        //filling the form with the data from the input.json
        await enterprisePage.filldetails(input)
    })
    test("capturing the Error", async ()=>{
        //leaving the email field blank and submitting the form and capturing the error
        await enterprisePage.submit()
        const error = await enterprisePage.getTheError()
        //storing the error in output as an object
        output={
            error:error
        }
    })
    test("writing output in json",async ()=>{
        //writing output in json
        writeDataToOutput("TS_03_output",output)
    })
    test.afterAll(async()=>{
        await page.close()
    })
});

