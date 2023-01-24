const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");

const screen = { width: 1080, height: 720 };
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless"); 
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false"); 


describe('parmbili', function() {
    this.timeout(30000)
    let driver
    let vars

    before(async function(){
        driver = await new Builder()
                .forBrowser("chrome")
                .setChromeOptions(chrome_options)
                .build(); 
        await driver.get("http://localhost:3000/");
    });

    beforeEach(async function() {
        await driver.sleep(3000);
        vars = {}
    });

    after(async function() {
        await driver.quit();
    });


  it('till', async function() {
    // Test name: till
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
  })

  it('plant', async function() {
    // Test name: plant
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | click | css=label:nth-child(1) img | 
    await driver.findElement(By.css("label:nth-child(1) img")).click()
    // 7 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
  })

  it('cancel_plant', async function() {
    // Test name: cancel plant
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | click | css=label:nth-child(1) img | 
    await driver.findElement(By.css("label:nth-child(1) img")).click()
    // 7 | click | css=.cancel_button | 
    await driver.findElement(By.css(".cancel_button")).click()
  })

  it('remove_plant', async function() {
    // Test name: remove plant
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=main | 
    await driver.findElement(By.css("main")).click()
    // 4 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 7 | click | css=label:nth-child(1) img | 
    await driver.findElement(By.css("label:nth-child(1) img")).click()
    // 8 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
    // 9 | mouseOver | css=.success_button | 
    {
      const element = await driver.findElement(By.css(".success_button"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 10 | click | css=.has_plant | 
    await driver.findElement(By.css(".has_plant")).click()
    // 11 | click | css=.gray_button | 
    await driver.findElement(By.css(".gray_button")).click()
    // 12 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
  })

  it('harvest_plant', async function() {
     // Test name: harvest_plant
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | click | css=label:nth-child(1) img | 
    await driver.findElement(By.css("label:nth-child(1) img")).click()
    // 7 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
    // 8 | waitForText | css=.for_harvesting > p | 15$
    await driver.wait(until.elementTextIs(await driver.findElement(By.css(".tile > p")), '15$'), 30000)
    // 9 | click | css=.for_harvesting | 
    await driver.findElement(By.css(".for_harvesting")).click()
    // 10 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 11 | assertText | id=earnings | Total Earnings: 55$
    assert(await driver.findElement(By.id("earnings")).getText() == "Total Earnings: 55$")
  })

it('cancel_plant_planted', async function() {
    // Test name: cancel_plant_planted
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | mouseOver | css=button:nth-child(1) | 
    {
      const element = await driver.findElement(By.css("button:nth-child(1)"))
      await driver.actions({ bridge: true }).move(element).perform()
    }
    // 7 | mouseOut | css=.popover-body > button | 
    {
      const element = await driver.findElement(By.css("body"))
      await driver.actions({ bridge: true }).move(element, 0, 0).perform()
    }
    // 8 | click | css=label:nth-child(1) img | 
    await driver.findElement(By.css("label:nth-child(1) img")).click()
    // 9 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
    // 10 | click | css=img | 
    await driver.findElement(By.css("img")).click()
    // 11 | click | css=.gray_button | 
    await driver.findElement(By.css(".gray_button")).click()
    // 12 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
  })

it('expand_land', async function() {
    // Test name: expand
    // Step # | name | target | value
    // 1 | open | / | 
    await driver.get("http://localhost:3000/")
    // 2 | setWindowSize | 1920x1043 | 
    await driver.manage().window().setRect({ width: 1920, height: 1043 })
    // 3 | click | css=.tile:nth-child(1) | 
    await driver.findElement(By.css(".tile:nth-child(1)")).click()
    // 4 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 5 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 6 | click | css=label:nth-child(4) > .crop_tile | 
    await driver.findElement(By.css("label:nth-child(4) > .crop_tile")).click()
    // 7 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
    // 8 | click | css=.has_plant | 
    await driver.findElement(By.css(".has_plant")).click()
    // 9 | click | css=.has_plant | 
    await driver.findElement(By.css(".has_plant")).click()
    // 10 | doubleClick | css=.has_plant | 
    {
      const element = await driver.findElement(By.css(".has_plant"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 11 | click | css=.for_harvesting | 
    await driver.findElement(By.css(".for_harvesting")).click()
    // 12 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 13 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 14 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 15 | click | css=label:nth-child(4) > .crop_tile | 
    await driver.findElement(By.css("label:nth-child(4) > .crop_tile")).click()
    // 16 | click | css=.success_button | 
    await driver.findElement(By.css(".success_button")).click()
    // 17 | click | css=.has_plant | 
    await driver.findElement(By.css(".has_plant")).click()
    // 18 | click | css=.has_plant | 
    await driver.findElement(By.css(".has_plant")).click()
    // 19 | doubleClick | css=.has_plant | 
    {
      const element = await driver.findElement(By.css(".has_plant"))
      await driver.actions({ bridge: true}).doubleClick(element).perform()
    }
    // 20 | click | css=.for_harvesting | 
    await driver.findElement(By.css(".for_harvesting")).click()
    // 21 | click | css=button:nth-child(1) | 
    await driver.findElement(By.css("button:nth-child(1)")).click()
    // 22 | click | css=button:nth-child(3) | 
    await driver.findElement(By.css("button:nth-child(3)")).click()
    // assert(driver.findElement(By.xpath("//div[@id='root']/div/main/div/div")))
    // console.log(await driver.findElements(By.css(".tiles tile")));
          // Get all the elements available with tag name 'p'
    let land = await driver.findElement(By.css(".tiles")).findElements(By.css(".tile"));
    assert(land.length === 25);
  })
})