const chrome = require("selenium-webdriver/chrome");
const assert = require("assert");
const { Builder, By, Key, until } = require("selenium-webdriver");
const { CONSTANT, HARVESTING_TIME, CROP } = require("./constants");

const screen = { width: 1920, height: 1043 };
let chrome_options = new chrome.Options().windowSize(screen);
chrome_options.addArguments("--proxy-server='direct://'");
chrome_options.addArguments("--proxy-bypass-list=*");
chrome_options.addArguments("--headless");
chrome_options.addArguments("--disable-gpu");
chrome_options.addArguments("--blink-settings=imagesEnabled=false");

/** 
*   DOCU: Test the parmbili activity
*   Last updated at: January 25, 2023
*   @author Alfonso
*/
describe("parmbili unit tests", function () {
	this.timeout(CONSTANT.timeout);
	let driver;

	/** 
	*   DOCU: Check if element exists
	*   Last updated at: January 25, 2023
	*   @param {string} assert_element the element to be asserted
	*   @author Alfonso
	*/
	const assertElement = async (assert_element) => {
		await driver.wait(until.elementLocated(By.css(assert_element)), CONSTANT.assert_timeout);
		{
			const search_input_field = await driver.findElements(By.css(assert_element));
			assert(search_input_field.length);
		}
		await driver.wait(until.elementIsVisible(await driver.findElement(By.css(assert_element))), CONSTANT.assert_timeout);
	}

	/** 
	*   DOCU: Harvest the plant
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	const harvestPlant = async () => {
		await driver.findElement(By.css(".for_harvesting")).click();
		await assertElement(".for_harvesting");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
	}

	/** 
	*   DOCU: Plant selected crop
	*   Last updated at: January 25, 2023
	*   @param {string} crop the selected crop to be planted
	*   @author Alfonso
	*/
	const plantCrop = async (crop) => {
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement(".crop_modal");
		await driver.findElement(By.css(crop)).click();
		await assertElement(".success_button");
		await driver.findElement(By.css(".success_button")).click();
		await assertElement(".tile:nth-child(1)");
	}

	before(async function () {
		driver = await new Builder().forBrowser("chrome").setChromeOptions(chrome_options).build();
		await driver.get("http://localhost:3000/");
	});

	beforeEach(async function () {
		await driver.sleep(CONSTANT.sleep);
	});

	after(async function () {
		await driver.quit();
	});

	/** 
	*   DOCU: Till the tile
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("1. Check if user can till the tile.", async function () {
		await driver.findElement(By.css(".tile:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement(".tilled");
	});

	/** 
	*   DOCU: Plant a crop
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("2. Check if user can plant a crop", async function () {
		await plantCrop(CROP.potato);
	});

	/** 
	*   DOCU: Cancel planting a crop
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("3. Check if user can cancel planting a crop", async function () {
		await driver.findElement(By.css(".tile:nth-child(2)")).click();
		await assertElement("button:nth-child(1)");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement(".crop_modal");
		await driver.findElement(By.css("label:nth-child(1) img")).click();
		await assertElement(".cancel_button");
		await driver.findElement(By.css(".cancel_button")).click();
		await assertElement(".tile:nth-child(2)");
	});

	/** 
	*   DOCU: Remove a crop that is planted in the tile
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("4. Check if user can remove a planted crop", async function () {
		await driver.findElement(By.css(".has_plant")).click();
		await assertElement(".has_plant");
		await driver.findElement(By.css(".gray_button")).click();
		await assertElement(".gray_button");
		await driver.findElement(By.css(".success_button")).click();
		await assertElement(".tile:nth-child(1)");
	});

	/** 
	*   DOCU: Harvest a crop that is planted in the tile
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("5. Check is user can harvest a planted crop", async function () {
		await driver.findElement(By.css(".tile:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await plantCrop(CROP.potato);
		await driver.wait(until.elementTextIs(await driver.findElement(By.css(".tile:nth-child(1) > p")), "15$"), HARVESTING_TIME.potato);
		await harvestPlant();
		await assert((await driver.findElement(By.id("earnings")).getText()) == "Total Earnings: 45$");
	});

	/** 
	*   DOCU: Remove a crop that is ready for harvesting
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("6. Check if user can cancel removing a ready for harvesting crop", async function () {
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await plantCrop(CROP.potato);
		await driver.findElement(By.css("img")).click();
		await assertElement("img");
		await driver.wait(until.elementTextIs(await driver.findElement(By.css(".tile:nth-child(1) > p")), "15$"), HARVESTING_TIME.potato);
		await driver.findElement(By.css(".tile:nth-child(1)")).click();
		await assertElement(".tile:nth-child(1)");
		await driver.findElement(By.css(".gray_button")).click();
		await assertElement(".gray_button");
		await driver.findElement(By.css(".success_button")).click();
		await assertElement(".tile:nth-child(1)");
	});

	/** 
	*   DOCU: Plant three corns then expand the land
	*   Last updated at: January 25, 2023
	*   @author Alfonso
	*/
	it("7. Check if a user can expand the tile", async function () {
		await driver.findElement(By.css(".tile:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await plantCrop(CROP.corn);
		await driver.wait(until.elementLocated(By.css(".for_harvesting")), HARVESTING_TIME.corn);
		await harvestPlant();
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await plantCrop(CROP.corn);
		await driver.wait(until.elementLocated(By.css(".for_harvesting")), HARVESTING_TIME.corn);
		await harvestPlant();
		await driver.findElement(By.css("button:nth-child(1)")).click();
		await assertElement("button:nth-child(1)");
		await plantCrop(CROP.corn);
		await driver.wait(until.elementLocated(By.css(".for_harvesting")), HARVESTING_TIME.corn);
		await harvestPlant();
		await driver.findElement(By.css("button:nth-child(3)")).click();
		await assertElement("button:nth-child(3)");
		let land = await driver.findElement(By.css(".tiles")).findElements(By.css(".tile"));
		await assert(land.length === CONSTANT.tile);
	});
});
