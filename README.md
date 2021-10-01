Addition Service
===================
Either a simple tcp server/client that can perform a few mathmatical operations.
Or a streams-based  expression evaluator and a single process expression-producer/result-consumer.

Install Dependencies
---------------------
`yarn|npm install`

Run it
----------
Start a consumer first in one shell, then one or more producers, each in it's own shell.
It's hard coded to use port `1234`, so either make sure that's clear, or change the `port`
variable in index.js

`yarn|npm start producer|consumer`

Run Tests
----------
`yarn|npm test`
