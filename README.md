# S-park_server

This repository represents the server part of the project S-park. The project aims at reducing the average time spent looking for parking spots in urban environments.  
This application starts an http server on the user's machine that serves as an middleware between a mobile app, a embedded circuit and a database.

## Build

Continuous integration is assured by Travis [here](https://travis-ci.com/github/SimonJ92/S-park_server).

[![Build Status](https://travis-ci.com/SimonJ92/S-park_server.svg?token=iupp3QJbBM7Y8CqnRq5B&branch=main)](https://travis-ci.com/SimonJ92/S-park_server)

## Requirements

This is a NodeJS application, it was developped using node 14.11.0 and continuous integration is done with node 12 and 14, compatibility with previous versions is unknown. 

The application needs to be ran along with a MySQL server. The application should work with MySQL 8.0.21 and 5.6.51, compatibility with other versions is unknown.

For your MySQL server, you can use the following tools :
- [Wamp](https://www.wampserver.com/) : Windows
- [Xampp](https://www.apachefriends.org/index.html) : Windows, Linux, OS X

Before using the server, you must import the database configuration from the [sql dump](s-park.sql). This can be done through the graphical user interface of your MySQL server or through the command line interface if mysql is installed on your system's CLI:
```bash
mysql -u root --password="" < s-park.sql
```

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

**The ip used in the following routes is the default loopback ip address. When started, the server will also listen on the machine's ip address: you probably want to use this one in a real use case.**

By default, the application can be found on localhost and on your machine's ip address on the port 8000.  
`http://127.0.0.1:8000/`

The url `http://127.0.0.1:8000/stop` can currently be used to properly stop the application : it should kill all node process used by the application.

Make sure that the MySQL server connection is correctly configured. You can change your MySQL server connection parameters [in the configuration file](conf/default.json).

The following will list all the http routes accepted by the server. If you want more details about the body to provide, the content of the request or the behavior of the server against edge cases, please look at the [tests](test) or the [source code](src) to get a better idea, or contact me at <simon.jolly.92@gmail.com> !

### Camera routes

#### Create

- A **POST** request to `http://127.0.0.1:8000/camera/` with a json body containing the latitude and longitude of the camera will create it in the database. the id of the camera that was created is returned in the response.

#### Get

- A **GET** request to `http://127.0.0.1:8000/camera/{cameraId}` will return the latitude and the longitude of the camera.

- A **GET** request to `http://127.0.0.1:8000/camera/` will return a list of all cameras in the database, each element of the list having the camera's Id, its latitude and longitude.

#### Update

- A **PATCH** request to `http://127.0.0.1:8000/camera/{cameraId}` with a json body containing the new latitude and longitude of the camera will update them in the database.

#### Delete

- A **DELETE** request to `http://127.0.0.1:8000/camera/{cameraId}` will delete the camera in the database. All the parking spots attached to this camera will be removed alongside it.

### Parking spots routes

#### Create

- A **POST** request to `http://127.0.0.1:8000/parkingspot/{cameraId}/{spotId}` will create a parking spot linked to the camera identified in the parameters and identified by the given spot id. By default, the parking spot is marked as unoccupied.

#### Get

- A **GET** request to `http://127.0.0.1:8000/parkingspot/{cameraId}/{spotId}` will return the state of the parking spot : `True` indicates that it is taken, `False` indicates that it is free.

- A **GET** request to `http://127.0.0.1:8000/parkingspot/{cameraId}` will return a list of all the parking spots linked to a camera in the database. Each element in the list will have its spot id and an indication of its availability.

- A **GET** request to `http://127.0.0.1:8000/parkingspot/` will return a list of all the parking spots in the database. Each element in the list will have its camera id, its spot id and an indication of its availability.

- A **GET** request to `http://127.0.0.1:8000/parkingspot/near/{latitude}/{latitude}` will return you a list of cameras near the geopoint at the coordinates given in parameters, each element of the list having the camera's Id, its latitude and longitude, the distance to the point and the number of available spots.

#### Update

- A **PATCH** request to `http://127.0.0.1:8000/parkingspot/{cameraId}/{spotId}/{state}` will update the availability of the parking spot in the database. The parameter `state` must be either `0` to indicate that the spot is **available** or `1` to indicate that it is **taken**.

#### Delete

- A **DELETE** request to `http://127.0.0.1:8000/parkingspot/{cameraId}/{spotId}` will delete the parking spot from the database.

## Testing

Launch unit tests using the following command:
```bash
npm test
```

Make sure that the MySQL server connection is correctly configured. You can change your MySQL server connection parameters [in the configuration file](conf/default.json).
