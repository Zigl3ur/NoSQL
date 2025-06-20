const fs = require('fs');

const data = fs.readFileSync('/docker-entrypoint-initdb.d/movies.json', 'utf8');
const movies = JSON.parse(data);

const db = db.getSiblingDB('nosql');

db.movies.insertMany(movies)