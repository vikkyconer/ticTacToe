# ticTacToe

## Pre-Requisites

* **NodeJS** - 8 Plus
* **MongoDB** - 3.6 Plus
* **Redis** - 4.0.9 Plus

## Usage

This project contains two modules **User** and **Game**. This game allows any two user to play game if both of them are not playing any other game

### User API's

* **SignUP** - 
    * Method - POST
    * URL - ```http://localhost:1235/api/user/add```
    * Payload - 
    ```JSON
  {
	"name": "User's name",
	"email": "email@gmail.com",
	"password": "password"
  }
    ```

* **Login** -
    * Method - POST
    * URL - ```http://localhost:1235/api/user/login```
    * Payload -
    ```JSON
    {
	"email": "email@gmail.com",
	"password": "password"
    }
    ```

* **Profile** -
    * Method - GET
    * URL - ```http://localhost:1235/api/user/profile```

### Game API's

* **Start Game** -
    * Method - GET
    * URL - ```http://localhost:1235/api/game/start```

* **Move** -
    * Method - POST
    * URL - ```http://localhost:1235/api/game/move```
    * Payload -
    ```JSON
    {
	"move": [1,2]
    }
    ```

* **Status** -
    * Method - GET
    * URL - ```http://localhost:1235/api/game/status```


Any two users can login and start the game and can perform their move one after the other.
