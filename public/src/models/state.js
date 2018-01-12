import m from "mithril";


export var State = {
  Databases:[],
  GetDatabases:function(){
    return m
			.request({
				method: "GET",
				url: "http://localhost:8080/sett/api/sett_data/databases"
			})
			.then(function(response) {
				console.log(response);
        State.Databases = response;

			})
			.catch(function(error) {
				console.error(error);
			});
  }
};
