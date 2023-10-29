# Todo

This repository contains a simple to app that I have created in phases. The first two are complete and hopefully I will be able to start on the third soon. Phase 1 was put together fast just to get an idea how to 
put this project together. It only handles client side Functionality, no server side code or database. Phase 2 is a Node.js Express app, with connectivity to a Mysql database and Bootstrap css. Phase 3 will be building 
off the last phase but with users and a login.  

## Table of Contents

- [Phase1](#phase1)
- [Phase2](#phase2)
- [Phase3](#phase3)

## Phase1

Phase 2 is a simple client side version of the Todo app with no bells or Whistles Strictly to get an idea of the project how it will work. There is no installation or setup required to view this webpage.
Simply open the web page up with your default browser as you would for other web projects.

## Phase2

Phase two has client side JS and node.js Express server for the backend connected to a Mysql database.

### Installation

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/todo

```

 ### Requirements

 All node modules are saved in this repository so there is no need To install any modules just simply clone the repository. For easy installation it is recommended you have git installed.
 This project Requires a.Env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE='todo_app'

```
The .env file should be located inside of root directory of the project.
There is a file in the repository named schema.sql that has the configuration for the My Sql database. simply copy this code in to the mysql terminal after logging in to configure the database.

 
### Execution

cd in to todo:

```bash

cd todo/phase2/server

```

hit enter then type:

```bash

node server.js

```

Hit enter agian, the server is now running. You can contact the app at localhost:4455/

or using your public Ip address after applying the appropriate port forwarding to your router.

 ## Phase3

 Coming soon!!!! 

