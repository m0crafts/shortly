package shortener

import (
	"fmt"
	"net/url"
	"strings"
)

func NormalizeURL(raw string) (string, error) {
	if !strings.HasPrefix(raw, "http://") && !strings.HasPrefix(raw, "https://") {
		raw = "https://" + raw
	}

	parsed, err := url.Parse(raw)
	if err != nil || parsed.Host == "" {
		return "", fmt.Errorf("invalid url")
	}

	return parsed.String(), nil
}
