import puppeteer from "puppeteer-extra";
import pkg from "puppeteer-extra-plugin-stealth";
const stealthPlugin = pkg;


export class Wiimmfi {
	constructor(cookie) {
		this.CF_COOKIE = cookie;
	}

	async launch() {
		puppeteer.use(stealthPlugin);
		const browser = await puppeteer.launch({ headless: false });
		const page = await browser.newPage();
		await page.setUserAgent({
			userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36"
		});

		browser.setCookie({
				name: "cf_clearance",
				value: this.CF_COOKIE,
				domain: "wiimmfi.de",
			})

		// default to my main mii's stats page
		await page.goto(`https://wiimmfi.de/stats/mkw/room/p${process.env["PID"] ?? "603153751"}`);
	}
}
