import puppeteer from "puppeteer-extra";
import pkg from "puppeteer-extra-plugin-stealth";
// very silly workaround
const stealthPlugin = pkg;

import { Logger } from "./logger.js";

import states from "./states.json" with { type: "json" };

const logger = new Logger("Wiimmfi", process.env["VERBOSITY"]);

export class Wiimmfi {
	trackNames = [
		{ displayName: "Luigi Circuit", fileName: "beginner_course" },
		{ displayName: "Moo Moo Meadows", fileName: "farm_course" },
		{ displayName: "Mushroom Gorge", fileName: "kinoko_course" },
		{ displayName: "Toad's Factory", fileName: "factory_course" },
		{ displayName: "Mario Circuit", fileName: "castle_course" },
		{ displayName: "Coconut Mall", fileName: "shopping_course" },
		{ displayName: "DK Summit", fileName: "boardcross_course" },
		{ displayName: "Wario's Gold Mine", fileName: "truck_course" },
		{ displayName: "Daisy Circuit", fileName: "senior_course" },
		{ displayName: "Koopa Cape", fileName: "water_course" },
		{ displayName: "Maple Treeway", fileName: "treehouse_course" },
		{ displayName: "Grumble Volcano", fileName: "volcano_course" },
		{ displayName: "Dry Dry Ruins", fileName: "desert_course" },
		{ displayName: "Moonview Highway", fileName: "ridgehighway_course" },
		{ displayName: "Bowser's Castle", fileName: "koopa_course" },
		{ displayName: "Rainbow Road", fileName: "rainbow_course" },
		{ displayName: "GCN Peach Beach", fileName: "old_peach_gc" },
		{ displayName: "DS Yoshi Falls", fileName: "old_falls_ds" },
		{ displayName: "SNES Ghost Valley 2", fileName: "old_obake_sfc" },
		{ displayName: "N64 Mario Raceway", fileName: "old_mario_64" },
		{ displayName: "N64 Sherbet Land", fileName: "old_sherbet_64" },
		{ displayName: "GBA Shy Guy Beach", fileName: "old_heyho_gba" },
		{ displayName: "DS Delfino Square", fileName: "old_town_ds" },
		{ displayName: "GCN Waluigi Stadium", fileName: "old_waluigi_gc" },
		{ displayName: "DS Desert Hills", fileName: "old_desert_ds" },
		{ displayName: "GBA Bowser Castle 3", fileName: "old_koopa_gba" },
		{ displayName: "N64 DK's Jungle Parkway", fileName: "old_donkey_64" },
		{ displayName: "GCN Mario Circuit", fileName: "old_mario_gc" },
		{ displayName: "SNES Mario Circuit 3", fileName: "old_mario_sfc" },
		{ displayName: "DS Peach Gardens", fileName: "old_garden_ds" },
		{ displayName: "GCN DK Mountain", fileName: "old_donkey_gc" },
		{ displayName: "N64 Bowser's Castle", fileName: "old_koopa_64" },
		{ displayName: "Block Plaza", fileName: "block_battle" },
		{ displayName: "Delfino Pier", fileName: "venice_battle" },
		{ displayName: "Funky Stadium", fileName: "skate_battle" },
		{ displayName: "Chain Chomp Wheel", fileName: "casino_battle" },
		{ displayName: "Thwomp Desert", fileName: "sand_battle" },
		{ displayName: "SNES Battle Course 4", fileName: "old_battle4_sfc" },
		{ displayName: "GBA Battle Course 3", fileName: "old_battle3_gba" },
		{ displayName: "N64 Skyscraper", fileName: "old_matenro_64" },
		{ displayName: "GCN Cookie Land", fileName: "old_CookieLand_gc" },
		{ displayName: "DS Twilight House", fileName: "old_House_ds" },
	];

	currentState = {};

	// default to my main mii's stats page
	watchUrl = `https://wiimmfi.de/stats/mkw/room/p${process.env["PID"] ?? "603153751"}`;

	constructor(userAgent, cookie) {
		this.USERAGENT = userAgent;
		this.CF_COOKIE = cookie;

		// just track how long you've been playing for, that seems the most reasonable for now
		this.start = Date.now();
	}

	async launch() {
		puppeteer.use(stealthPlugin());

		let headlessnessOfBrowser = process.env["HEADLESS_BROWSER"] !== "false"

		logger.info("launching puppeteer browser...")

		this.browser = await puppeteer.launch({ headless: headlessnessOfBrowser });
		this.page = await this.browser.newPage();

		this.page.setViewport({
			width: 1280,
			height: 720,
		});

		await this.page.setUserAgent({
			userAgent: this.USERAGENT,
		});

		this.browser.setCookie({
			name: "cf_clearance",
			value: this.CF_COOKIE,
			domain: "wiimmfi.de",
		});

		await this.page.goto(this.watchUrl);

		// just in case the captcha is incredibly silly
		try {
			await this.page.waitForSelector(".nb-fixed#navbar")
		} catch(error) {
			logger.error(error.stack, "timed out waiting for cloudflare captcha");
		}
	}

	fillTemplateState(stateName) {
		const translations = {
			"START": this.start,
			"USERNAME": this.username,
			"VR": this.vr,
			"CURRENT TRACK DISPLAY NAME": this.currentTrack?.displayName,
			"CURRENT TRACK FILE NAME": this.currentTrack?.fileName,
			"PLAYER COUNT": this.playerCount
		}

		// pass object by value, assuming it uses primitives (:
		// see https://stackoverflow.com/a/24273055/17834675
		this.currentState = JSON.parse(JSON.stringify(states[stateName]));

		// need a local copy of states object (hence modifiedStates), use imported as reference
		const recurseFill = obj => {
			for (const key of Object.keys(obj)) {
				if (typeof obj[key] === "object" && obj[key] !== null) {
					recurseFill(obj[key]);
				}

				// get {stuff in braces} but chop the {} off
				typeof obj[key] === "string" && obj[key].match(/({.+?})+/g)?.map(e=>e.slice(1,-1))
				.forEach(placeholder => {
					// additional check to preserve primitives; if replacing the entire obj[key], pass value instead of string.replace
					if (obj[key] === "{" + placeholder + "}") {
						obj[key] = translations[placeholder];
					} else {
						obj[key] = obj[key].replaceAll(`{${placeholder}}`, translations[placeholder]);
					}
				});

			}
		}

		recurseFill(this.currentState);

		return this.currentState;
	}

	async getPlayerStats() {
		/* if (this.page.url() !== this.watchUrl) */ await this.page.goto(this.watchUrl);

		if (await this.page.$(".warn") && await this.page.$eval(".warn", e => e.innerText === "No room found!")) {
			logger.info("not in game");
			return this.fillTemplateState("NOT_IN_GAME");
		}

		/* await this.page.waitForNavigation({
			waitUntil: "networkidle0",
		}); */

		// this will make it so much easier trust me
		const PID = process.env["PID"];
		await this.page
			.evaluate(PID => {
				document.querySelector(`td[data-tooltip='pid=${PID}']`).parentElement.setAttribute("rpc-tag", "username");
				return null;
			}, PID)
			.catch(error => {
				logger.warn("bruh");
				logger.error(error, error.stack);
			});

		// return "bruh"

		this.username = await this.page.$eval("tr[rpc-tag='username'] > td > span.mii-font", e => e.innerText);
		this.playerCount = (await this.page.$$("span.mii-font")).length;
		this.vr = await this.page.$eval("tr[rpc-tag='username'] > td:nth-child(7)", e => e.innerText);

		// haha magic selector! let's hope the page layout doesn't change AT ALL 🤪
		// regex matches "track name (track author)" as "group1 (group 2)"
		const trackUrlSelector = "th > p > a";

		if (await this.page.$(trackUrlSelector) === null) {
			this.currentTrack = {
				displayName: "Nothing",
				author: "Nobody",
				filename: "not_found"
			}
			return this.fillTemplateState("IDLE");
		}

		let trackMatches = (await this.page.$eval(trackUrlSelector, e => e.innerText)).match(/W?i?i? ?(.+) (\(.+\))/);

		let currentTrackName = trackMatches[1];
		logger.info(`playing ${currentTrackName}`);

		this.currentTrack = {
			displayName: currentTrackName,
			author: trackMatches[2],
			fileName: this.trackNames.find(obj => obj.displayName === currentTrackName).fileName,
		};

		logger.info(`Mii name: ${this.username}`);

		return this.fillTemplateState("IN_GAME");
	}

	async getLiveRoomCount() {
		await this.page.goto("https://wiimmfi.de/stats/mkw");

		this.roomCount = (await this.page.$$(".tc")).length;

		logger.info(`${this.roomCount} online rooms`);
		return this.roomCount;
	}
}
