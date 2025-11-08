import { Client } from "discord-rpc";
// import "dotenv/config"
// import process from "process";

class DiscordRPC {
	

	constructor() {
		this.start = Date.now();
		this.client = new Client({
			transport: "ipc",
		});

		this.env = {
			CLIENT_ID: "1432098284922736740",
		};

		this.activity = {
			details: "Starting puppeteer",
			state: "Initializing...",
			startTimestamp: Date.now(),
			largeImageKey: "large-image",
			largeImageText: "live calvin's dad reaction",
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
		};
	}

	async loginRpc() {
		console.log("logging in");
		console.log(this.env)
		try {
			await this.client.login({
				clientId: this.env.CLIENT_ID,
			});
		} catch (error) {
			console.error(`uh oh! couldn't log in ):`);
			console.error(error, error.stack)
			// setTimeout(this.loginRpc, this.env.RECONNECT_TIMEOUT);
		}
	}

	setActivity() {
		const updateActivity = _ => {
			try {
				this.client.setActivity(this.activity);
				console.log("RPC set!");
			} catch (error) {
				console.error(`Failed to start RPC.`);
				console.error(error, error.stack)
				// setTimeout(updateActivity, this.env.RECONNECT_TIMEOUT);
			}
		};
	
		updateActivity();
	}
}

// module.exports = { DiscordRPC };
export { DiscordRPC };