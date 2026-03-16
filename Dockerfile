FROM golang:1.24-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .

RUN go build -o bin/server ./cmd/main.go

FROM alpine:latest

COPY --from=builder /app/bin/server .

EXPOSE 8080
CMD ["./server"]