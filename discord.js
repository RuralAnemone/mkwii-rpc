import { Client } from "discord-rpc";
import "dotenv/config";

import { Logger } from "./logger.js";

import states from "./states.json" with { type: "json" };

const logger = new Logger("Discord", process.env["VERBOSE_LOGS"]);

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
		logger.info("logging in...");
		try {
			await this.client.login({
				clientId: this.CLIENT_ID,
			});
			logger.info("logged in!");
		} catch (error) {
			logger.warn(`uh oh! couldn't log in ):`);
			logger.error(error, error.stack);
		}
	}

	async setActivity(activity) {
		try {
			await this.client.setActivity(activity);
			logger.info("RPC set!");
		} catch (error) {
			logger.warn(`Failed to start RPC.`);
			logger.error(error, error.stack);
		}
	}
}

export { DiscordRPC };
