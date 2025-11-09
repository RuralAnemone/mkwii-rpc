import "dotenv/config";
import process from "process";

import { DiscordRPC } from "./discord.js";
import { Wiimmfi } from "./wiimmfi.js";

const rpc = new DiscordRPC();

const trackNames = [
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

const wf = new Wiimmfi("U8.AkbyX7aWN7N9z7UqsfQCK1GosaS57xckbgR69sLw-1762585817-1.2.1.1-CNzKx.RmlugSOFSi.H_0_XRD5u_B7Ml16lNfOrLKhUllM8iyPatdJ99Ph_ZPHmOefDShsZVh5L4UrZs7ZahTnJvJnDaHrRPNWMr9P24buNsBa26KvusCPAwfE.3hqiOj.udVU4vG9LtD3XvImTJWR0_PXvcxJB.H62_u7ygDMVEoG.LpOhkArTHGJKG.VUa8zfx2g4D3cB_Fs6IKDTO_2tpugYuD2AP1qW9Oero9wwc");

await wf.launch();

const start = Date.now();
setInterval(async () => {
	rpc.setActivity({
		details: "poring over stats (updating every minute)",
		state: `there are ${await wf.getLiveRoomCount()} live rooms`,
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
}, 60e3);

rpc.loginRpc();
