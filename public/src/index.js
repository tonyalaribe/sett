import m from "mithril";
import { Shell } from "./containers/shell.js";
import { ChooseDatabase } from "./containers/chooseDatabase.js";

var root = document.getElementById("appContainer");

m.route.prefix("#!");

m.route(root, "/", {
	"/": {
		view: () => (
			<Shell>
				<ChooseDatabase />
			</Shell>
		)
	},
});
