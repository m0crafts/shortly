package handler

import (
	"encoding/json"
	"io"
	"log"
	"net/http"

	"github.com/m0crafts/url-shortener/internal/shortener"
	"github.com/m0crafts/url-shortener/internal/store"
	"github.com/redis/go-redis/v9"
)

type GenerateRequestBody struct {
	OriginalUrl string `json:"original_url"`
}

func Generate(store *store.PostgresStore, rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		defer r.Body.Close()
		var body GenerateRequestBody
		err := json.NewDecoder(io.LimitReader(r.Body, 2048)).Decode(&body)
		w.Header().Set("Content-Type", "application/json")

		if err != nil || body.OriginalUrl == "" {
			w.WriteHeader(400)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Invalid request",
			})
			return
		}

		originalUrl, err := shortener.NormalizeURL(body.OriginalUrl)
		if err != nil {
			w.WriteHeader(400)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Invalid URL",
			})
			return
		}

		// Check if already exists in DB
		shortCode, found := store.FindByOriginal(originalUrl)
		if found {
			w.WriteHeader(200)
			json.NewEncoder(w).Encode(map[string]string{
				"short_code": shortCode,
			})
			return
		}

		var maxRetries = 10
		var clash = false
		for i := range maxRetries {
			shortCode = shortener.Hash(originalUrl, i)
			// Check if collides with urls in DB
			_, clash = store.FindByCode(shortCode)
			if !clash {
				break
			}
		}

		if clash {
			w.WriteHeader(400)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "Too many duplicates found [Max Retries Reached]",
			})
			return
		}

		// Save to DB
		err = store.Save(shortCode, originalUrl)
		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			json.NewEncoder(w).Encode(map[string]string{
				"message": "An error occurred while saving to DB",
			})
			return
		}

		// Save to Redis
		if err = rdb.Set(r.Context(), shortCode, originalUrl, 0).Err(); err != nil {
			log.Println("redis cache error:", err)
		}
		w.WriteHeader(201)
		json.NewEncoder(w).Encode(map[string]string{
			"short_code": shortCode,
		})

	}
}
