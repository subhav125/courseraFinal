

export class HomePage{
    constructor(page){
        this.page = page
        this.search=page.getByPlaceholder('What do you want to learn?');
        this.english_unchecked=page.getByTestId("language:English-false");
        this.beginner_unchecked=page.getByTestId("productDifficultyLevel:Beginner-false");
        this.res='//div[@data-testid="product-card-cds"]';
        this.name='//h3[@class="cds-CommonCard-title css-6ecy9b"]';
        this.rating='//div[@class="cds-RatingStat-meter"]/div';
        this.duration='//div[@class="cds-CommonCard-metadata"]/p';
        this.show_more='//button[@aria-label="Show more Language options"]';
        this.language='//div[contains(@data-testid,"language")]';
        this.level="//div[contains(@data-testid,'productDifficultyLevel')]";

        //locator for validation
        this.english_checked = page.getByTestId("language:English-true").locator('input');
        this.beginner_checked = page.getByTestId("productDifficultyLevel:Beginner-true").locator('input');
        this.searchedCourse = '//div[@id="search-results-header-wrapper"]//descendant::span'
    }
 
    async navigate(url){
        await this.page.goto(url)
        await this.page.waitForLoadState('load')
    }
    async searchForCourse(name){
        await this.search.fill(name);
        await this.page.keyboard.down('Enter')
    }
    async filter(){
        await this.page.waitForLoadState('domcontentloaded')
        await this.english_unchecked.locator('input').click();
        await this.beginner_unchecked.locator('input').click();
    }
    async display() {
        await this.page.waitForLoadState('networkidle')
        const results = await this.page.locator(this.res).all();  
        //await this.page.waitForLoadState('networkidle')
        let courseDetails=[];
        for (let i = 0; i < Math.min(2, results.length); i++) {
            const courseName = await results[i].locator(this.name).innerText()
            //console.log(courseName);
            const rating = await results[i].locator(this.rating).innerText()
            //console.log(rating);
            const duration = await results[i].locator(this.duration).innerText();
            const split = duration.split(' · ');
            const time = split[2]
            //console.log(time);
            const course = {
                courseName: courseName,
                rating: rating,
                duration: time
            }
            courseDetails.push(course);
        }
        return courseDetails;
    }
    async lang()
    {
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.show_more).click();
        await this.page.waitForLoadState('networkidle');

        const languageElements = await this.page.locator(this.language).all();
        let languages=[];
        //console.log(languageElements.length)
        for (const lang of languageElements) {
            languages.push(await lang.innerText())
        }
        return languages
    }
    async levels()
    {
        const level = await this.page.locator(this.level).all();
        //console.log(level.length)
        let levels=[]
        for (const le of level) {
            levels.push(await le.innerText()); 
        }
        return levels
    }
    
}