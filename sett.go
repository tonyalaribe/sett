package sett

import (
	"encoding/json"
	"log"
	"net/http"
	"strconv"
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
	arguments := strings.Split(urlPath, "/")
	log.Println(arguments)
	switch arguments[0] {
	case "databases":
		response := []string{}
		for k := range databases {
			response = append(response, k)
		}

		json.NewEncoder(w).Encode(response)
		break
	case "keys":
		response := []string{}
		page := r.URL.Query().Get("p")
		pageInt := 1
		var err error
		if page != "" {
			pageInt, err = strconv.Atoi(page)
			if err != nil {
				log.Println(err)
			}
		}

		pageInt = pageInt - 1

		perPage := 10
		skip := perPage * pageInt

		log.Println(skip)
		limit := skip + perPage
		log.Println(limit)

		databases[arguments[1]].Database.View(func(txn *badger.Txn) error {
			opt := badger.IteratorOptions{Reverse: true, PrefetchSize: 10}
			opt.PrefetchSize = 10
			opt.PrefetchValues = false
			it := txn.NewIterator(opt)

			count := 0

			for it.Rewind(); count <= (limit) &&
				it.Item() != nil; func() {

				// log.Println(string(it.Item().Key()))
				it.Next()
			}() {
				log.Println("before skip")

				if count <= skip {
					count++
					continue
				}

				count++
				log.Println("after skip")
				// if !bytes.HasPrefix(it.Item().Key(), []byte(shopid)) {
				// 	continue
				// }
				//
				// for it.Rewind(); it.Valid(); it.Next() {

				item := it.Item()
				k := item.Key()
				response = append(response, string(k))

			}
			return nil
		})
		// log.Println(response)
		json.NewEncoder(w).Encode(response)
		break
	case "value":
		// var response interface{}
		var byt []byte

		databases[arguments[1]].Database.View(func(txn *badger.Txn) error {
			item, err := txn.Get([]byte(arguments[2]))
			if err != nil {
				log.Println(err)
			}

			byt, err = item.Value()
			if err != nil {
				log.Println(err)
			}

			return nil

		})

		// response := make(map[string]interface{})
		// log.Println(string(byt))
		// log.Println(databases[arguments[1]].Codec.Name())
		// err := databases[arguments[1]].Codec.Unmarshal(byt, &response)
		// if err != nil {
		// 	log.Println(err)
		// }

		// log.Println(response)
		json.NewEncoder(w).Encode(string(byt))
		break

	case "search":
		response := []string{}
		page := r.URL.Query().Get("p")
		query := r.URL.Query().Get("k")
		pageInt := 1
		var err error
		if page != "" {
			pageInt, err = strconv.Atoi(page)
			if err != nil {
				log.Println(err)
			}
		}

		pageInt = pageInt - 1

		perPage := 10
		skip := perPage * pageInt

		log.Println(skip)
		limit := skip + perPage
		log.Println(limit)

		databases[arguments[1]].Database.View(func(txn *badger.Txn) error {
			opt := badger.IteratorOptions{Reverse: true, PrefetchSize: 10}
			opt.PrefetchSize = 10
			opt.PrefetchValues = false
			it := txn.NewIterator(opt)

			// count :aa= 0

			prefix := []byte(query)
			log.Println(query)
			log.Println(string(prefix))
			for it.Rewind(); it.ValidForPrefix(prefix); it.Next() {
				log.Println("before skip")

				// if count <= skip {
				// 	count++
				// 	continue
				// }
				//
				// if count >= limit {
				// 	break
				// }
				// count++
				log.Println("after skip")

				item := it.Item()
				k := item.Key()
				response = append(response, string(k))

			}
			return nil
		})
		// log.Println(response)
		json.NewEncoder(w).Encode(response)
		break
	}
}
