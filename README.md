# fn-screener-backend
FounderNest Screener Backend, developed with love by [__Francisco Aranda__](https://github.com/flaranda/)

This project is an MVP backend that exposes a minimal API for the [FounderNest Screener MVP](http://beta.928684.foundernest.com:8080/)

---

## Requirements

- **Node >= 14**
- Docker (a version able to launch `docker compose` command)

## Installation and usage

Execute the following scripts to configure your environment:

- `npm install`
- `npm run docker`
- `npm run mongo-seed`

And just a few more scripts to get everything up and running:

- `npm run build` (optional, if you want to run `npm run start:dist` later)
- `npm run start` or `npm run start:dist`

And that's all, you can find the API on `localhost:3000`

## API documentation

### Swagger

The project comes with a detailed Swagger documentation with the specifications and schemas that compose every exposed API endpoint.

The Swagger application will be live after executing `npm run docker` and you can visit it on `localhost:8080`.

### Postman

You can find a Postman collection with a saved configuration to perform a sample request to every API endpoint. To use the collection, just follow [this instructions](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/#importing-data-into-postman).
