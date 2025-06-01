export class Form{
    constructor(page){
        this.page = page
        this.forEnterprise = page.getByText('For Enterprise')
        this.errorMsg = page.locator('.mktoErrorMsg')
        this.firstName= page.locator('#FirstName')
        this.lastName= page.locator('#LastName')
        this.email = page.locator('#Email')
        this.phoneNo = page.locator('#Phone')
        this.orgType_sel = page.locator('#rentalField9')
        this.jobTitle = page.locator('#Title')
        this.companyName = page.locator('#Company')
        this.companySize_sel = page.locator('#Employee_Range__c')
        this.describe_sel = page.locator('#What_the_lead_asked_for_on_the_website__c')
        this.country_sel = page.locator("#Country")
        this.state_sel = page.locator('#State')
        this.submit_btn = page.locator('//button[text()="Submit"]')
    }
 
    async clickForEnterprise(){
        await this.forEnterprise.click()
        await this.page.waitForLoadState('load')
    }
    async filldetails(obj){
        await this.firstName.fill(obj.firstName)
        await this.lastName.fill(obj.lastName)
        await this.email.fill(obj.email)
        await this.phoneNo.fill(obj.phoneNo)
        await this.orgType_sel.click()
        await this.orgType_sel.selectOption('Business')
        await this.jobTitle.fill(obj.jobTitle)
        await this.companyName.fill(obj.companyName)
        await this.companySize_sel.click()
        await this.companySize_sel.selectOption(obj.companySize)
        await this.describe_sel.click()
        await this.describe_sel.selectOption(obj.describe)
        await this.country_sel.click()
        await this.country_sel.selectOption(obj.country)
        await this.state_sel.click()
        await this.state_sel.selectOption(obj.state)
    }
    async submit(){
        await this.submit_btn.click()
    }
    async getTheError(){
        let error
        if(this.errorMsg.isVisible())
            error= await this.errorMsg.textContent()
        else
            error = "No Error"
        return error
    }
}