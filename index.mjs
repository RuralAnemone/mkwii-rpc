import "dotenv/config";
import process from "process";

import { DiscordRPC } from "./discord.js";
import { Wiimmfi } from "./wiimmfi.js";

const rpc = new DiscordRPC();

/* async function wait(ms) {
	return new Promise((res, _rej) => {
		setTimeout(res, ms);
	});
} */

/* function updatePresence(newPresence) {
	// maybe do some other stuff?
	rpc.setActivity(newPresence);
} */

rpc.client.on("ready", () => {
	console.log("Connected!");
	rpc.setActivity();
});

// C-c break or whatever (or gui whenever I get there)
process.on("SIGINT", async () => {
	console.error("attempting to shut down gracefully (emergency exit in 5 seconds)");
	try {
		setTimeout(() => {
			console.error("EMERGENCY EXIT");
			process.exit(2);
		}, 5000);
		await rpc.client.destroy();
		console.error("RPC client destroyed. ( ͡° ͜ʖ ͡°)︻̷┻̿═━一- ");
		process.exit(0);
	} catch (error) {
		console.error(error.stack);
		console.error("lol rip, failed to destroy RPC client.");
		process.exit(1);
	}
});

const wf = new Wiimmfi(process.env["USERAGENT"], process.env["CF_CLEARANCE"]);

await wf.launch();

const start = Date.now();
setInterval(async () => {
	rpc.setActivity({
		details: `logged in as ${await wf.getPlayerStats()}`,
		state: `there are idk how many live rooms`,
		startTimestamp: start,
		largeImageKey: "large-image",
		largeImageText: "live dad reaction",
		smallImageKey: "small-image",
		smallImageText: "me 4 years ago",
		instance: false,
		buttons: [
			{
				label: "butonn",
				url: "https://exmaple.com",
			},
			{
				label: "button",
				url: "https://example.com",
			},
		],
	});
}, 5e3);

rpc.loginRpc();
