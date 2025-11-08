import puppeteer from "puppeteer";

export class Wiimmfi {
	async launch() {
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();

		// default to my main mii's stats page
		await page.goto(`https://wiimmfi.de/stats/mkw/room/p${process.env["PID"] ?? "603153751"}`);
	}
}
