package handler

import (
	"fmt"
	"net/http"
	"os"

	"github.com/m0crafts/url-shortener/internal/store"
	"github.com/redis/go-redis/v9"
)

func Redirect(store *store.PostgresStore, rdb *redis.Client) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		shortCode := r.PathValue("code")

		//	Check Redis
		var originalUrl string
		err := rdb.Get(r.Context(), shortCode).Scan(&originalUrl)

		if err == nil && originalUrl != "" {
			http.Redirect(w, r, originalUrl, http.StatusTemporaryRedirect)
			return
		}

		// Check DB
		originalUrl, found := store.FindByCode(shortCode)

		client := os.Getenv("CLIENT_URL")
		if client == "" {
			client = "http://localhost:5173"
		}
		if !found {
			url := fmt.Sprintf("%s/404", client)
			http.Redirect(w, r, url, http.StatusTemporaryRedirect)
			return
		}

		rdb.Set(r.Context(), shortCode, originalUrl, 0)
		http.Redirect(w, r, originalUrl, http.StatusTemporaryRedirect)
	}
}
