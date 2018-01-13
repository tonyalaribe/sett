import m from "mithril";
import { Shell } from "./containers/shell.js";
import { ChooseDatabase } from "./containers/chooseDatabase.js";
import { ExploreDatabase } from "./containers/exploreDatabase.js";

var root = document.getElementById("appContainer");

m.route.prefix("#!");

m.route(root, "/", {
	"/": {
		view: ({ attrs }) => (
			<Shell {...attrs}>
				<ChooseDatabase {...attrs} />
			</Shell>
		)
	},
	"/db/:db": {
		view: ({attrs}) => (
			<Shell {...attrs}>
				<ExploreDatabase {...attrs} />
			</Shell>
		)
	}
});
