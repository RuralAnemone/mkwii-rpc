// const process = require("process");
// const puppeteer = require("puppeteer");

import { log } from "console";
import { Client } from "discord-rpc";
import "dotenv/config";
import process from "process";
import puppeteer from "puppeteer";

// defaults
const env = {
	CLIENT_ID: process.env["CLIENT_ID"],
	CLIENT_SECRET: process.env["CLIENT_SECRET"],
	STATUS_TEXT: "testin mkw-rpc lol",
	PID: "603151246",
	RECONNECT_TIMEOUT: process.env["RECONNECT_TIMEOUT"] ?? 5000,
	// MKW_ANA_ENABLED=false
	// MKW_ANA_COMMAND="tcpdump -w- -U -i eth1 host wii | tee save.dump | mkw-ana"
};

/* async function wait(ms) {
	return new Promise((res, _rej) => {
		setTimeout(res, ms);
	});
} */

const rpc = new Client({
	transport: "ipc",
});

const start = Date.now();

const activity = {
	details: "maro kar whii rpc",
	state: "bro idk why this timer is ratelimited",
	startTimestamp: start,
	largeImageKey: "large-image",
	largeImageText: "like I just set it to Date.now() and set it once",
	smallImageKey: "small-image",
	smallImageText: "whys it gotta update every 15 seconds at minimum",
	instance: false,
	buttons: [
		{
			label: "Join us",
			url: "https://discord.com/invite/your-invite-link",
		},
		{
			label: "Learn More",
			url: "https://example.com",
		},
	],
};

function setActivity(client = rpc) {
	const updateActivity = _ => {
		try {
			client.setActivity(activity);
			console.log("RPC set!");
		} catch (error) {
			console.error(`Failed to start RPC.`);
			setTimeout(updateActivity, env.RECONNECT_TIMEOUT);
		}
	};

	updateActivity();
}

async function loginRpc() {
	console.log("logging in");
	try {
		await rpc.login({
			clientId: env.CLIENT_ID,
			clientSecret: env.CLIENT_SECRET,
		});
	} catch (error) {
		console.error(`uh oh! couldn't log in ):`);
		setTimeout(loginRpc, env.RECONNECT_TIMEOUT);
	}
}

rpc.on("ready", () => {
	console.log("Connected!");
	// console.log(rpc);
	setActivity();
});

// C-c break or whatever (or gui whenever I get there)
process.on("SIGINT", async () => {
	console.error("attempting to shut down gracefully (emergency exit in 5 seconds)");
	try {
		setTimeout(() => {
			console.error("EMERGENCY EXIT");
			process.exit(2);
		}, 5000);
		await rpc.destroy();
		console.error("RPC client destroyed. ( ͡° ͜ʖ ͡°)︻̷┻̿═━一- ");
		process.exit(0);
	} catch (error) {
		console.error(error.stack);
		console.error("lol rip, failed to destroy RPC client.");
		process.exit(1);
	}
});

loginRpc();
