import { Client } from "discord-rpc";
import "dotenv/config"

import states from "./states.json" with { type: "json" }

class DiscordRPC {
	CLIENT_ID = process.env.CLIENT_ID ?? "1432098284922736740";

	constructor() {
		this.start = Date.now();
		this.client = new Client({
			transport: "ipc",
		});
		states.INIT.startTimestamp = Date.now()
		this.activity = states.INIT;
	}

	async loginRpc() {
		console.log("logging in");
		try {
			this.client.login({
				clientId: this.CLIENT_ID,
			});
			console.log("logged in")
		} catch (error) {
			console.error(`uh oh! couldn't log in ):`);
			console.error(error, error.stack);
		}
	}

	setActivity() {
		const updateActivity = _ => {
			try {
				this.client.setActivity(this.activity);
				console.log("RPC set!");
			} catch (error) {
				console.error(`Failed to start RPC.`);
				console.error(error, error.stack);
			}
		};
	
		updateActivity();
	}
}

export { DiscordRPC };