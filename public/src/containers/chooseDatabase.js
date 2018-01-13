import m from "mithril";
import cn from "classnames";
import { State } from "../models/state.js";

export var ListItem = {
	view: function(vnode) {
		console.log(vnode);
		let { db } = vnode.attrs;
		return (
			<a
				class="db link grow navy z3 mv2"
				oncreate={m.route.link}
				href={`/db/${db}`}
			>
				<div class="bt bb b--white bg-white shadow-4">
					<div class="pa4 f3">
						<span>{db}</span>
					</div>
				</div>
			</a>
		);
	}
};

export var ChooseDatabase = {
	oncreate: function() {
		State.GetDatabases();
	},
	view: function() {
		return (
			<section>
				<section class="tc dt vh-100 w-100">
					<div class="dtc v-mid tc">
						<div class="dib w-50-ns ">
							<div>
								<h2 class="pa3">Databases</h2>
							</div>
							{State.Databases.map(function(db) {
								return <ListItem db={db} />;
							})}
						</div>
					</div>
				</section>
			</section>
		);
	}
};
