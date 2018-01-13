import m from "mithril";
import { State } from "../models/state.js";

export var ExploreDatabase = {
	oncreate: function(vnode) {
		let db = vnode.attrs.db;
		console.log(vnode);
		State.GetKeys(db);
	},

	view: function({ attrs: { db } }) {
		return (
			<section>
				<div class="">
					<a oncreate={m.route.link} href="/" class="dib pa2 ">home</a>
					>
					<span class="dib pa2">{db}</span>
				</div>
				<div class="tc pa3 ">
					<input type="text"  class="pa3 ba bw0 shadow-4 w-50-ns w-100 dib ba b--light-gray" placeholder="Search for keys" oninput={m.withAttr("value", (v)=>State.KeysSearch(db,v))}/>
				</div>
			<section class="" style="height:85vh">
				<section class="w-30 dib v-top h-100">
					<a class="db pa3 bg-navy white-90 tc">Keys</a>
					<div class="overflow-scroll " style="height:90%">
					{State.Keys.map((key, i) => {
						return (
							<a
								class="db pa3 bb b--light grow pointer"
								key={i}
								onclick={() => State.LoadValue(db, key)}
							>
								{key}
							</a>
						);
					})}

					<div class="tc pv2">
						<a class="bg-navy white-90 pa3 dib pointer" onclick={()=> State.LoadMoreKeys(db)} >Load more</a>
					</div>
				</div>
				</section>
				<section class="w-70 dib bl b--light-gray v-top h-100">
					<a class="db pa3 bg-navy white-90 tc">Values</a>
					<div class="wraph-100 pa4" style="overflow-wrap: break-word;;">{State.CurrentValue}</div>
				</section>
			</section>
		</section>
		);
	}
};
