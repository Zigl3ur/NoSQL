FROM golang:latest AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app/nosql-backend main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/nosql-backend .
EXPOSE 8080
CMD ["./nosql-backend"]