import "dotenv/config";
import fs from "fs";
import process from "process";

import { DiscordRPC } from "./discord.js";
import { Logger } from "./logger.js";
import { Wiimmfi } from "./wiimmfi.js";
import path from "path";

const rpc = new DiscordRPC();
const logger = new Logger("MKW RPC", process.env["VERBOSITY"]);
logger.showHeader();

/* async function wait(ms) {
	return new Promise((res, _rej) => {
		setTimeout(res, ms);
	});
} */

if (!fs.existsSync(path.join(__dirname, ".env"))) {
	logger.error("Can't find .env file.");
	logger.warn("copy .env.example to .env and fill out the values.");
	process.exit(2);

	// not even gonna check for correct .env values cus that's your own problem
}

rpc.client.on("ready", async () => {
	logger.info("Connected!");
	await rpc.setActivity(await wf.getPlayerStats());
	setInterval(async () => {
		await rpc.setActivity(await wf.getPlayerStats());
	}, 9e3);
	// 9e3 ∵ allowing for a bit of wiggle room within the 10-second window
});

// C-c break or whatever (or gui whenever I get there)
process.on("SIGINT", async () => {
	console.log() // offset ^C in console
	logger.info("attempting to shut down gracefully (emergency exit in 5 seconds)");
	try {
		setTimeout(() => {
			logger.warn("EMERGENCY EXIT");
			process.exit(2);
		}, 5000);
		await rpc.client.destroy();
		logger.info("RPC client destroyed. ( ͡° ͜ʖ ͡°)︻̷┻̿═━一- ");
		process.exit(0);
	} catch (error) {
		logger.warn("lol rip, failed to destroy RPC client.");
		logger.error(error.stack);
		process.exit(1);
	}
});

const wf = new Wiimmfi(process.env["USERAGENT"], process.env["CF_CLEARANCE"]);

await wf.launch();

rpc.loginRpc();
