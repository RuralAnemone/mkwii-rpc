import chalk from "chalk";

export class Logger {
	// "MKWII RPC" in ANSI block characters with drop shadow and double-stroke border
	// in case you were unaware
	headerText =`╔═══════════════════════════════════════════════════════════════════╗
║                                                                   ║
║  ███╗   ███╗██╗  ██╗██╗    ██╗██╗██╗    ██████╗ ██████╗  ██████╗  ║
║  ████╗ ████║██║ ██╔╝██║    ██║╚═╝╚═╝    ██╔══██╗██╔══██╗██╔════╝  ║
║  ██╔████╔██║█████╔╝ ██║ █╗ ██║██╗██╗    ██████╔╝██████╔╝██║       ║
║  ██║╚██╔╝██║██╔═██╗ ██║███╗██║██║██║    ██╔══██╗██╔═══╝ ██║       ║
║  ██║ ╚═╝ ██║██║  ██╗╚███╔███╔╝██║██║    ██║  ██║██║     ╚██████╗  ║
║  ╚═╝     ╚═╝╚═╝  ╚═╝ ╚══╝╚══╝ ╚═╝╚═╝    ╚═╝  ╚═╝╚═╝      ╚═════╝  ║
║                                                                   ║
╚═══════════════════════════════════════════════════════════════════╝`

	/**
	 * Logger
	 * @param {String} whoami Name of the module using this logger
	 * @param {"INFO"|"WARN"|"ERROR"|String} verbosity Show verbose logs? You should probably set this up to inherit from your module's parent.
	 */
	constructor(whoami, verbosity = "INFO") {
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
	 * @param {"INFO"|"WARN"|"ERROR"|String} severity severity level of log. defaults to "INFO"
	 */
	#log(text, severity = "INFO") {
		const severityRanking = ["INFO", "WARN", "ERROR"];
		const now = new Date();

		const timePad = time => time.toString().padStart(2, "0");

		// getMonth is zero-indexed, nothing else is.
		const padded = {
			month: timePad((now.getMonth() + 1)),
			date: timePad(now.getDate()),
			hours: timePad(now.getHours()),
			minutes: timePad(now.getMinutes()),
			seconds: timePad(now.getSeconds()),
			milliseconds: now.getMilliseconds().toString().padEnd(3, "0")
		}

		// "ah yes let's have only one implementation of ISO8601, nobody's ever going to use any other format specified in the international standard."
		// – ECMA
		const timestamp = `${now.getFullYear()}-${padded.month}-${padded.date} ${padded.hours}:${padded.minutes}:${padded.seconds}.${padded.milliseconds}`;

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
				// enforce 5 characters
				severityText = chalk.bold(severity.slice(0,5).padEnd(5));
				break;
		}

		const formattedText = `${timestamp} ${severityText} [${this.whoami}] ${text}`

		// very rudimentary but it works I think maybe
		// I haven't tested it :3
		let necessary = severityRanking.indexOf(severity) >= severityRanking.indexOf(this.verbosity);

		if (necessary) {
			console.log(formattedText)
		} else if (this.isVerbose) {
			console.log(formattedText);
		}
	}

	// aliases

	/**
	 * Log to the console with INFO level severity.
	 * @param {String} texts Text(s) to log.
	 */
	info(...texts) {
		for (const text of texts) {
			this.#log(text, "INFO");
		}
	}

	/**
	 * Log to the console with WARN level severity.
	 * @param {String} texts Text(s) to log.
	 */
	warn(...texts) {
		for (const text of texts) {
			this.#log(text, "WARN");
		}
	}

	/**
	 * Log to the console with ERROR level severity.
	 * @param {String} texts Text(s) to log.
	 */
	error(...texts) {
		for (const text of texts) {
			this.#log(text, "ERROR");
		}
	}
}
