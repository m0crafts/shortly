package store

import (
	"context"
	"log"

	"github.com/jackc/pgx/v5/pgxpool"
)

type PostgresStore struct {
	pool *pgxpool.Pool
}

func NewPostgresStore(pool *pgxpool.Pool) *PostgresStore {
	return &PostgresStore{pool: pool}
}

func (s *PostgresStore) FindByOriginal(url string) (string, bool) {
	var shortCode string
	row := s.pool.QueryRow(context.Background(), "SELECT short_code FROM urls WHERE original_url=$1", url)
	err := row.Scan(&shortCode)
	if err != nil {
		log.Println(err)
		return "", false
	}

	return shortCode, true
}

func (s *PostgresStore) FindByCode(shortCode string) (string, bool) {
	var originalUrl string
	row := s.pool.QueryRow(context.Background(), "SELECT original_url FROM urls WHERE short_code=$1", shortCode)
	err := row.Scan(&originalUrl)

	if err != nil {
		log.Println(err)
		return "", false
	}
	return originalUrl, true
}

func (s *PostgresStore) Save(shortCode, originalUrl string) error {
	_, err := s.pool.Exec(context.Background(), "INSERT INTO urls (short_code, original_url) VALUES ($1, $2)", shortCode, originalUrl)
	return err
}
