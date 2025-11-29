import chalk from "chalk";

export class Logger {
	// "MKWII RPC" in ANSI block characters with drop shadow and double-stroke border
	headerText =`╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  ███╗   ███╗██╗  ██╗██╗    ██╗██╗██╗    ██████╗ ██████╗  ██████╗  ║
║  ████╗ ████║██║ ██╔╝██║    ██║██║██║    ██╔══██╗██╔══██╗██╔════╝  ║
║  ██╔████╔██║█████╔╝ ██║ █╗ ██║██║██║    ██████╔╝██████╔╝██║       ║
║  ██║╚██╔╝██║██╔═██╗ ██║███╗██║██║██║    ██╔══██╗██╔═══╝ ██║       ║
║  ██║ ╚═╝ ██║██║  ██╗╚███╔███╔╝██║██║    ██║  ██║██║     ╚██████╗  ║
║  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝╚═╝    ╚═╝  ╚═╝╚═╝      ╚═════╝  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝`

	constructor(whoami, verbosity = false) {
		this.isVerbose = verbosity;
		this.whoami = whoami;
	}

	showHeader() {
		console.log(chalk.blue(this.headerText));
	}

	init() {
		// stub for later functionality?
		this.showHeader();
	}

	/**
	 * Log a message to the console with a timestamp and its severity
	 * @param {String} text text to log
	 * @param {{"INFO"|"WARN"|"ERROR"}} severity log level (INFO, WARN, ERROR)
	 */
	log(text, severity) {
		const now = new Date();
		
		// "ah yes let's have only one implementation of ISO8601, nobody's ever going to use any other format specified in the international standard."
		// – ECMA
		const timestamp = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;

		let severityText = "";

		switch (severity) {
			case "INFO":
				severityText = chalk.cyan("INFO ");
				break;
			case "WARN":
				severityText = chalk.yellow("WARN ");
				break;
			case "ERROR":
				severityText = chalk.bgRed.white("ERROR")
				break;
			default:
				severityText = "     ";
				break;
		}

		const formattedText = `${timestamp} ${severityText} [${this.whoami}] ${text}`

		if (necessary) {
			console.log(formattedText)
		} else if (this.isVerbose) {
			console.log(formattedText);
		}
	}
}
