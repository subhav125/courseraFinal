# Test info

- Name: TS_02 : Language and Levels >> navigation
- Location: C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\tests\TS_02.spec.js:17:9

# Error details

```
Error: page.goto: Target page, context or browser has been closed
Call log:
  - navigating to "https://www.coursera.org/search?query=web%20development%20courses&sortBy=BEST_MATCH", waiting until "load"

    at HomePage.navigate (C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\page\home.js:24:25)
    at C:\Users\2398094\OneDrive - Cognizant\Desktop\Final\tests\TS_02.spec.js:19:24
```

# Test source

```ts
   1 |
   2 |
   3 | export class HomePage{
   4 |     constructor(page){
   5 |         this.page = page
   6 |         this.search=page.getByPlaceholder('What do you want to learn?');
   7 |         this.english_unchecked=page.getByTestId("language:English-false");
   8 |         this.beginner_unchecked=page.getByTestId("productDifficultyLevel:Beginner-false");
   9 |         this.res='//div[@data-testid="product-card-cds"]';
  10 |         this.name='//h3[@class="cds-CommonCard-title css-6ecy9b"]';
  11 |         this.rating='//div[@class="cds-RatingStat-meter"]/div';
  12 |         this.duration='//div[@class="cds-CommonCard-metadata"]/p';
  13 |         this.show_more='//button[@aria-label="Show more Language options"]';
  14 |         this.language='//div[contains(@data-testid,"language")]';
  15 |         this.level="//div[contains(@data-testid,'productDifficultyLevel')]";
  16 |
  17 |         //locator for validation
  18 |         this.english_checked = page.getByTestId("language:English-true").locator('input');
  19 |         this.beginner_checked = page.getByTestId("productDifficultyLevel:Beginner-true").locator('input');
  20 |         this.searchedCourse = '//div[@id="search-results-header-wrapper"]//descendant::span'
  21 |     }
  22 |  
  23 |     async navigate(url){
> 24 |         await this.page.goto(url)
     |                         ^ Error: page.goto: Target page, context or browser has been closed
  25 |         await this.page.waitForLoadState('load')
  26 |     }
  27 |     async searchForCourse(name){
  28 |         await this.search.fill(name);
  29 |         await this.page.keyboard.down('Enter')
  30 |     }
  31 |     async filter(){
  32 |         await this.page.waitForLoadState('domcontentloaded')
  33 |         await this.english_unchecked.locator('input').click();
  34 |         await this.beginner_unchecked.locator('input').click();
  35 |     }
  36 |     async display() {
  37 |         await this.page.waitForLoadState('networkidle')
  38 |         const results = await this.page.locator(this.res).all();  
  39 |         //await this.page.waitForLoadState('networkidle')
  40 |         let courseDetails=[];
  41 |         for (let i = 0; i < Math.min(2, results.length); i++) {
  42 |             const courseName = await results[i].locator(this.name).innerText()
  43 |             //console.log(courseName);
  44 |             const rating = await results[i].locator(this.rating).innerText()
  45 |             //console.log(rating);
  46 |             const duration = await results[i].locator(this.duration).innerText();
  47 |             const split = duration.split(' · ');
  48 |             const time = split[2]
  49 |             //console.log(time);
  50 |             const course = {
  51 |                 courseName: courseName,
  52 |                 rating: rating,
  53 |                 duration: time
  54 |             }
  55 |             courseDetails.push(course);
  56 |         }
  57 |         return courseDetails;
  58 |     }
  59 |     async lang()
  60 |     {
  61 |         await this.page.waitForLoadState('networkidle');
  62 |         await this.page.locator(this.show_more).click();
  63 |         await this.page.waitForLoadState('networkidle');
  64 |
  65 |         const languageElements = await this.page.locator(this.language).all();
  66 |         let languages=[];
  67 |         //console.log(languageElements.length)
  68 |         for (const lang of languageElements) {
  69 |             languages.push(await lang.innerText())
  70 |         }
  71 |         return languages
  72 |     }
  73 |     async levels()
  74 |     {
  75 |         const level = await this.page.locator(this.level).all();
  76 |         //console.log(level.length)
  77 |         let levels=[]
  78 |         for (const le of level) {
  79 |             levels.push(await le.innerText()); 
  80 |         }
  81 |         return levels
  82 |     }
  83 |     
  84 | }
```