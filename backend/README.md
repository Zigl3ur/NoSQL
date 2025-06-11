# BackEnd

## EndPoints

### _MongoDB_

- **PUT** `/api/mongo/init` - Reset MongoDB with fresh data

  - **Body**: No body required

- **POST** `/api/mongo/find-one` - Find one document

  - **Body**:

    ```json
    {
      "find-one": [
        { "title": "Star Wars" }, // filter
        { "titlle": 1, "description": 1 } // projection
      ]
    }
    ```

- **POST** `/api/mongo/find-many` - Find many documents

  - **Body**:

    ```json
    {
      "find-many": [
        { "actors": "Keanu Reeves" }, // filter
        { "title": 1 } // projection
      ],
      "sort": { "title": 1 }, // sort
      "skip": 0, // skip
      "limit": 2 // limit
    }
    ```

- **PUT** `/api/mongo/update-one` - Update one document

  - **Body**:
    ```json
    {
      "update": [
        { "title": "Pacific Rim" }, // filter
        { "$inc": { "rating": 2.5 } } // update
      ]
    }
    ```

- **PUT** `/api/mongo/update-many` - Update many documents
  - **Body**:
    ```json
    {
      "update": [
        { "actors": "Keanu Reeves" }, // filter
        { "$inc": { "rating": 2.5 } } // update
      ]
    }
    ```
- **DELETE** `/api/mongo/delete-one` - Delete one document

  - **Body**:
    ```json
    {
      "delete": [
        { "title": "A Minecraft Movie" } // filter
      ]
    }
    ```

- **DELETE** `/api/mongo/delete-many` - Delete many documents
  - **Body**:
    ```json
    {
      "delete": [
        { "actors": "Jack Black" } // filter
      ]
    }
    ```

### _ElasticSearch_

- **PUT** `/api/elastic/init` - Reset ElasticSearch index with fresh data

  - **Body**: No body required

- **POST** `/api/elastic/search` - Search in ElasticSearch with given query

  - **Body**:
    ```json
    {
      "query": {
        "match": {
          "title": "Star Wars"
        }
      },
      "size": 10
    }
    ```
