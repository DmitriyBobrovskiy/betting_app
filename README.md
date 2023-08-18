# Betting App
This app is a very basic dice betting API.
Technologies used: Node.js + TypeScript, Sequelize, GraphQL + Apollo, PostgresSQL, Docker
# How to run
## Docker compose
In command line run
```bash
docker compose up --build
```
Then check it with any GraphQL tool on localhost:4000

## Locally
You will still need database, so for that
```bash
docker compose up database
```
and then to run the project just run `npm start`

# Considerations
* There was no information in test assignment of how to create users, so I decided to create them on CreateBet mutation if it's not created yet
  * the best here would be to create another endpoint to create users
* Types from GraphQL schema can be generated automatically
* Unit tests should be created as well, but I omit them to not spend extra time
