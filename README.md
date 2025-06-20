<div align="center">
<img src="./frontend/public/favicon.ico" alt="NoSQL Logo" width="100" />
<h1>NoSQL</h1>
</div>

A simple web app made with [React Router](https://reactrouter.com/) and [Gin](https://gin-gonic.com/)

The project was made to learn non relational databases like MongoDB and text search engines like ElasticSearch.

## Features

- **MongoDB**: Basic queries like find, update, delete and aggregate. Custom queries with filters, projections, sorting, skipping and limiting.

- **ElasticSearch**: Basic aggregation and text search queries, custom queries. Also charts for data visualization.

## Getting Started

### Prerequisites

1. Clone the repository:

   ```bash
   git clone https://github.com/Zigl3ur/NoSQL.git
   cd nosql
   ```

> [!IMPORTANT]
> You may need to adjust `VITE_BACKEND` variable in `.env.production` file to match the backend URL if you are running the backend on a different port or host.

2. Run with Docker:

   ```bash
   docker compose up
   ```

3. Access the app at [`http://localhost:3000`](http://localhost:3000)
