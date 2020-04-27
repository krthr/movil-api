# Adonis API application

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

1. Create an `.env` file with the following variables:

```env
APP_KEY=[random string]
HOST=127.0.0.1
PORT=[port]
DB_CONNECTION=pg
PG_CONNECTION_STRING=[string connection to Postgres database]
```

2. Start the server:

```bash
adonis start 
```

### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```
