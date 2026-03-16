package shortener

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
)

func Hash(url string, attempts int) string {
	input := url
	if attempts > 0 {
		input = fmt.Sprintf("%s_%d", url, attempts)
	}

	h := sha256.New()
	h.Write([]byte(input))

	return hex.EncodeToString(h.Sum(nil))[:8]
}
