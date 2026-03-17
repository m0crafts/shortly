package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
	"github.com/m0crafts/url-shortener/internal/handler"
	"github.com/m0crafts/url-shortener/internal/store"
	"github.com/redis/go-redis/v9"
)

func main() {
	godotenv.Load()

	port := os.Getenv("PORT")
	dbURL := os.Getenv("DATABASE_URL")
	redisURL := os.Getenv("REDIS_URL")

	// Postgres
	var pool *pgxpool.Pool
	var err error

	for i := range 5 {
		pool, err = pgxpool.New(context.Background(), dbURL)
		if err == nil {
			err = pool.Ping(context.Background())
		}
		if err == nil {
			break
		}
		log.Printf("DB not ready, attempt %d/5 - retrying in 2s", i+1)
		time.Sleep(2 * time.Second)
	}

	if err != nil {
		log.Fatalf("Could not connect to database: %s", err)
	}

	defer pool.Close()
	log.Println("Connected to Postgres")
	pgStore := store.NewPostgresStore(pool)

	// Redis
	rdb := redis.NewClient(&redis.Options{Addr: redisURL})

	if err = rdb.Ping(context.Background()).Err(); err != nil {
		log.Fatalf("Could not connect to redis: %s", err)
	}

	defer rdb.Close()
	log.Println("Connected to Redis")

	// Routes
	mux := http.NewServeMux()

	mux.Handle("POST /generate", handler.Generate(pgStore, rdb))

	mux.HandleFunc("GET /{code}", func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("GET /{code}", r.URL.Path)
	})

	// Server
	addr := fmt.Sprintf(":%s", port)
	log.Printf("server starting on %s", addr)
	if err = http.ListenAndServe(addr, mux); err != nil {
		log.Fatalf("server error: %v", err)
	}
}
