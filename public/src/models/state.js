import m from "mithril";

// const BACKEND_ROOT = "http://localhost:8080";

const BACKEND_ROOT = "";

export var State = {
	Databases: [],
	Keys: [],
	CurrPage: 1,
	CurrKeyPage: 1,
	GetDatabases: function() {
		return m
			.request({
				method: "GET",
				url: "${BACKEND_ROOT}/sett/api/sett_data/databases"
			})
			.then(function(response) {
				State.Databases = response;
			})
			.catch(function(error) {
				console.error(error);
			});
	},
	GetKeys: function(db) {
		return m
			.request({
				method: "GET",
				url: `${BACKEND_ROOT}/sett/api/sett_data/keys/${db}`
			})
			.then(function(response) {
				State.Keys = response;
			})
			.catch(function(error) {
				console.error(error);
			});
	},
	LoadValue: function(db, key) {
		return m
			.request({
				method: "GET",
				url: `${BACKEND_ROOT}/sett/api/sett_data/value/${db}/${key}`
			})
			.then(function(response) {
				State.CurrentValue = response;
				State.CurrPage = 1;
				State.CurrKeyPage = 1;
			})
			.catch(function(error) {
				console.error(error);
			});
	},
	LoadMoreKeys: function(db) {
		State.CurrPage++;
		return m
			.request({
				method: "GET",
				url: `${BACKEND_ROOT}/sett/api/sett_data/keys/${db}?p=${State.CurrPage}`
			})
			.then(function(response) {
				State.Keys = State.Keys.concat(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	},
	KeysSearch: function(db, query) {
		console.log(db, query);
		return m
			.request({
				method: "GET",
				url: `${BACKEND_ROOT}/sett/api/sett_data/search/${db}?k=${query}`
			})
			.then(function(response) {
				console.log(response);
				State.Keys = State.Keys.concat(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	},
	KeysSearchMore: function(db, query) {
		State.CurrPage++;
		return m
			.request({
				method: "GET",
				url: `${BACKEND_ROOT}/sett/api/sett_data/keys/${db}?p=${State.CurrPage}`
			})
			.then(function(response) {
				State.Keys = State.Keys.concat(response);
			})
			.catch(function(error) {
				console.error(error);
			});
	}
};
