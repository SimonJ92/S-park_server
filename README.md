# S-park_server

This repository represents the server part of the project S-park. The project aims at reducing the average time spent looking for parking spots in urban environments.  
This application starts an http server on the user's machine that serves as an middleware between a mobile app, a embedded circuit and a database.

## Requirements

This is a NodeJS application, it was developped using node 14.11.0, compatibility with previous versions is unknown. 

The application needs to be ran along with a MySQL server. The application works with MySQL 8.0.21, compatibility with previous versions is unknown. Tests for MySQL 5.6.51 will be conducted soon.

For your MySQL server, you can use the following tools :
- [Wamp](https://www.wampserver.com/) : Windows
- [Xampp](https://www.apachefriends.org/index.html) : Windows, Linux, OS X

## Installation

Install the application using the following commands :
```bash
git clone https://github.com/SimonJ92/S-park_server.git
cd S-park_server
npm install
```

## Usage

Start the application using the following command :
```bash
npm start
```

By default, the application can be found on localhost and on your machine's ip address on the port 8000.  
`http://127.0.0.1:8080/`

The url `http://127.0.0.1:8000/stop` can currently be used to properly stop the application : it should kill all node process used by the application.

Make sure that the MySQL server connection is correctly configured. You can change your MySQL server connection parameters [in the configuration file](conf/default.json).

## Testing

Launch unit tests using the following command:
```bash
npm test
```

Make sure that the MySQL server connection is correctly configured. You can change your MySQL server connection parameters [in the configuration file](conf/default.json).

Continuous integration might be added soon.