FROM golang:latest

WORKDIR /app

COPY . .
RUN go mod download
RUN go build -o main .

ENV PAGES=5

RUN chmod +x main

CMD [ "sh", "-c", "./main ${PAGES}" ]