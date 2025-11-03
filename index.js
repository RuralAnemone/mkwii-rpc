const client = require("discord-rich-presence")("1432098284922736740");
const process = require("process");
const puppeteer = require("puppeteer");

client.updatePresence({
	state: "doin stuff idk",
	details: "detaile",
	startTimestamp: Date.now(),
	endTimestamp: Date.now() + 1337,
	instance: true
});