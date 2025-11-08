import process from "process";
import puppeteer from "puppeteer";
import { DiscordRPC } from "./discord.js"

const rpc = new DiscordRPC();

// defaults
const env = {
	STATUS_TEXT: "testin mkw-rpc lol",
	PID: "603151246",
	// MKW_ANA_ENABLED=false
	// MKW_ANA_COMMAND="tcpdump -w- -U -i eth1 host wii | tee save.dump | mkw-ana"
};

const trackNames = ["Luigi Circuit","Moo Moo Meadows","Mushroom Gorge","Toad's Factory","Mario Circuit","Coconut Mall","DK Summit","Wario's Gold Mine","Daisy Circuit","Koopa Cape","Maple Treeway","Grumble Volcano","Dry Dry Ruins","Moonview Highway","Bowser's Castle","Rainbow Road","GCN Peach Beach","DS Yoshi Falls","SNES Ghost Valley 2","N64 Mario Raceway","N64 Sherbet Land","GBA Shy Guy Beach","DS Delfino Square","GCN Waluigi Stadium","DS Desert Hills","GBA Bowser Castle 3","N64 DK's Jungle Parkway","GCN Mario Circuit","SNES Mario Circuit 3","DS Peach Gardens","GCN DK Mountain","N64 Bowser's Castle","Block Plaza","Delfino Pier","Funky Stadium","Chain Chomp Wheel","Thwomp Desert","SNES Battle Course 4","GBA Battle Course 3","N64 Skyscraper","GCN Cookie Land","DS Twilight House"]

// destructively shorten track name, for use in image keys. should I just use the .szs file names and have a lookup table with some other useful info?\
// idk I don't really feel like it rn lol
function shortenTrackName(name = "") {
	// name = name.toLowerCase();
	// name = name.replaceAll("'", "");
	// name = name.replaceAll(" ", "-");

	// return name;

	return name.toLowerCase().replaceAll("'", "").replaceAll(" ", "-");
}

/* async function wait(ms) {
	return new Promise((res, _rej) => {
		setTimeout(res, ms);
	});
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

rpc.loginRpc();