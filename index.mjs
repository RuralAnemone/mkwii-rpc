// const process = require("process");
// const puppeteer = require("puppeteer");

import {} "discord-rpc"
import process from "process";
import puppeteer from "puppeteer";

const start = Date.now();
const end = start + 1337;

const clientId = "1432098284922736740";


async function wait(ms) {
	return new Promise((res, _rej) => {
		setTimeout(res, ms);
	});
}

// temp update loop
while (1) {
	client.updatePresence({
		state: "doin stuff idk",
		details: "detaile",
		startTimestamp: start,
		endTimestamp: end,
		instance: true
	});

	console.log("set it at " + new Date().toLocaleTimeString())

	await wait(5 * 1000);
}
