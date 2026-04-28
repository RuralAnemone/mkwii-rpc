import states from "./states.json" with { type: "json" };

export class StateManager {
	constructor() {
		this.data = data;

		this.translations = {
			START: data.start,
			USERNAME: data.username,
			VR: data.vr,
			"CURRENT TRACK DISPLAY NAME": data.currentTrack?.displayName,
			"CURRENT TRACK FILE NAME": data.currentTrack?.fileName,
			"PLAYER COUNT": data.playerCount,
		};
	}
	
	getTemplateState(stateName) {
		// pass-by-value
		this.currentState = structuredClone(states[stateName]);

		// need a local copy of states object (hence structuredClone), use imported as reference
		const recurseFill = obj => {
			for (const key of Object.keys(obj)) {
				if (typeof obj[key] === "object" && obj[key] !== null) {
					recurseFill(obj[key]);
				}

				// get {stuff in braces} but chop the {} off
				typeof obj[key] === "string" &&
					obj[key]
						.match(/({.+?})+/g)
						?.map(e => e.slice(1, -1))
						.forEach(placeholder => {
							// additional check to preserve primitives: if replacing the entire obj[key], pass value instead of string.replace
							if (obj[key] === "{" + placeholder + "}") {
								obj[key] = translations[placeholder];
							} else {
								obj[key] = obj[key].replaceAll(`{${placeholder}}`, translations[placeholder]);
							}
						});
			}
		};

		recurseFill(this.currentState);

		return this.currentState;
	}
}
