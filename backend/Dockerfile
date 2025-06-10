FROM golang:latest AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server main.go

FROM alpine:latest
WORKDIR /app
COPY bulk-movies.json .
COPY movies.json .
COPY --from=builder /app/server .
ENV PORT=8080
EXPOSE $PORT
CMD ["./server"]