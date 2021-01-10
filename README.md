# MERN questions and answers

Questions and Answers app built with MERN stack along with react-bootstrap and axios

## Quick Start

Set up an env file and add your MONGO_URI and port number the app will listen on.

Install dependencies for server
npm install

Install dependencies for client
npm run client-install

Start the client and server with concurrently

### `npm run dev`

Run the Express server only

### `npm run server`

Run the React client only

### `npm run client`

Server runs on http: http://localhost:5000 client runs on http://localhost:3000

## Deployment

The Heroku post build script in package.json helps to facilitate the build process so that you don't have to compile the React frontend manually, it is done on the server. Just push to Heroku and it will build and load the client index.html page.
