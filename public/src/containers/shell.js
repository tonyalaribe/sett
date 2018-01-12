import m from "mithril";
import Slideout from "slideout";

import cn from "classnames";

export var Head = {
	oncreate: function() {
	},
	view: function({ attrs }) {
		console.log(attrs);
		return (
			<div class="pa2 tc shadow-4">
				<div class="dib fl">
					<a class="dib toggle-button">
						<img src="/assets/img/hamburger-menu.svg" class="w2" />
					</a>
				</div>
				<div class="dib pa2">
					<a class="link white" oncreate={m.route.link} href="/">
						DIDU
					</a>
				</div>
				<div class="dib pa2 fr ">i</div>
			</div>
		);
	}
};




export var Shell = {
	view: function({ state, children }) {
		return (
			<section>
				<section
					id="panel"
					class=" vh-100 overflow-scroll bl b--light-gray navy"
				>
					{children}
				</section>
			</section>
		);
	}
};
