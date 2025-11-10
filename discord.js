import { Client } from "discord-rpc";
import "dotenv/config";

import states from "./states.json" with { type: "json" };

class DiscordRPC {
	CLIENT_ID = process.env.CLIENT_ID ?? "1432098284922736740";

	constructor() {
		this.start = Date.now();
		this.client = new Client({
			transport: "ipc",
		});

		this.client.on("ready", () => {
			const initActivity = states["INIT"];
			initActivity["startTimestamp"] = this.start;
			this.setActivity(initActivity);
		});
	}

	async loginRpc() {
		console.log("logging in");
		try {
			await this.client.login({
				clientId: this.CLIENT_ID,
			});
			console.log("logged in");
		} catch (error) {
			console.error(`uh oh! couldn't log in ):`);
			console.error(error, error.stack);
		}
	}

	async setActivity(activity) {
		try {
			await this.client.setActivity(activity);
			console.log(`${new Date().toLocaleString()}: RPC set!`);
		} catch (error) {
			console.error(`Failed to start RPC.`);
			console.error(error, error.stack);
		}
	}
}

export { DiscordRPC };
