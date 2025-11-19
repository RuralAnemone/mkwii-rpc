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

	constructor(verbosity = false) {
		this.isVerbose = verbosity;
	}

	clear() {
		// stub for later functionality?
		console.clear();
	}

	showHeader() {
		console.log(chalk.blue(this.headerText));
	}

	init() {
		// this.clear();
		this.showHeader();
	}

	log(text, necessary) {
		if (necessary) {
			console.log(text)
		} else if (this.isVerbose) {
			console.log(text);
		}
	}
}
