import blessed from "blessed";

const screen = blessed.screen({
	fastCSR: true
});

screen.title = "hi (:";

const box = blessed.box({
	top: "center",
	left: "center",
	width: "50%",
	height: "50%",
	content: "hello world",
	tags: true,
	border: {
		type: "line"
	},
	style: {
		fg: "white",
		bg: "cornflowerblue",
		border: {
			fg: "#dabeef"
		},
		hover: {
			bg: "#00beef"
		}
	}
});

screen.append(box);

screen.key(['escape', 'q', 'C-c'], (ch, key) => {
	return process.exit(0);
});

box.focus();

screen.render();

// epic, I love this library