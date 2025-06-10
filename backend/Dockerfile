FROM golang:latest AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN go build -o /app/nosql-backend main.go

FROM alpine:latest
WORKDIR /app
COPY --from=builder /app/nosql-backend .
ENV PORT=8080
EXPOSE $PORT
CMD ["./nosql-backend"]