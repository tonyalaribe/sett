package sett

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"

	"github.com/dgraph-io/badger"
	"github.com/tonyalaribe/sett/codec"
)

var databases = make(map[string]DB)

type DB struct {
	ID       string
	Database *badger.DB
	Codec    codec.MarshalUnmarshaler
}

func Register(id string, db *badger.DB, codec codec.MarshalUnmarshaler) {
	databases[id] = DB{
		ID:       id,
		Database: db,
		Codec:    codec,
	}
}

func AssetHandler(w http.ResponseWriter, r *http.Request) {
	urlPath := strings.Split(r.URL.Path, "/sett_data/")[1]
	log.Println(r.URL.Path)
	log.Println(urlPath)

	switch urlPath {
	case "databases":
		response := []string{}
		for k := range databases {
			response = append(response, k)
		}

		json.NewEncoder(w).Encode(response)
		return

	}

}
