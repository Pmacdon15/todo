# Todo

This repository contains a simple to app that I have created in phases. The first two are complete and hopefully I will be able to start on the third soon. Phase 1 was put together fast just to get an idea how to 
put this project together. It only handles client side Functionality, no server side code or database. Phase 2 is a Node.js Express app, with connectivity to a Mysql database and Bootstrap css. Phase 3 will be building 
off the last phase but with users and a login.  

## Table of Contents

- [Phase1](#phase1)
- [Phase2](#phase2)
    - [Installation](#Installation)
    - [Requirements](#Requirements)
    - [Database](#Database)
    - [Startup](#Startup)
- [Phase3](#phase3)
    - [Installation_p3](#Installation_p3)
    - [Requirements_p3](#Requirements_p3)
    - [Database_p3](#Database_p3)
    - [Startup_p3](#Startup_p3)

## Phase1

Phase 1 is a simple client side version of the Todo app with no bells or whistles Strictly to get an idea of the project how it will work. There is no installation or setup required to view this webpage. Simply open the web page up with your default browser as you would for other web projects.

## Phase2

Phase 2 has client side JS and node.js Express server for the backend connected to a Mysql database.

### Installation

> **Note**
> For easy cloning it is recommended you have git installed.

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/todo

```

### Requirements

Next we will need to install the Node Modules, I will list the commands here:

```bash

cd todo

```

```bash

npm install node

```

```bash

npm install express

```

```bash

npm install mysql2

```

```bash

npm install dotenv

```

> [!IMPORTANT]
> All modules listed above are required for functionality.

### Database

This project requires a My Sql database connection. After downloading and installing MySql, Configure your database and take note of the credentials. There is a file in the repository, in /phase2/server, named schema.sql that has the configuration for the My Sql database. Simply copy and paste this code in to the My Sql terminal after logging on to the database.

This project Requires a .env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE='todo_app'

```

> [!IMPORTANT]
>The .env file should be located inside of root directory of the project.

### Startup

If you are already in todo/phase2/server

Then run:

```bash

node server.js

```

The server is now running. You can contact the app at localhost:4455/ or using your public Ip address after applying the appropriate port forwarding to your router.(Depending on your system you can hold control on the keyboard and click on the link in the terminal, after starting the server)

## Phase3

Phase 3 is an Express Web App, using My Sql and Json Web Token. With the authorization process each user is able to freely access the API while Unauthorized users will be redirected to the login page.

### Installation_p3

> **Note**
> For easy cloning it is recommended you have git installed.

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/todo

```

### Requirements_p3

Next open the project by running this command:

```bash

cd phase3

```

```bash

cd todo

```

```bash

npm install node

```

```bash

npm install express

```

```bash

npm install mysql2

```

```bash

npm install dotenv

```

```bash

npm install npm install cookie-parser 


```bash

npm install npm install jsonwebtoken


```


### Database_p3

This project requires a My Sql database connection. After downloading and installing MySql, Configure your database and take note of the credentials. There is a file in the repository, in /phase3/server, named schema.sql that has the configuration for the My Sql database. Simply copy and paste this code in to the My Sql terminal after logging on to the database.

This project Requires a .env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE='todo_app_p3'

```
### Startup_p3

If you are already in todo/phase3/server

Then run:

```bash

node server.js

```

If you are in the root directory of the project run:

```bash

npm start

```

The server is now running. You can contact the app at localhost:4455/ or using your public Ip address after applying the appropriate port forwarding to your router.(Depending on your system you can hold control on the keyboard and click on the link in the terminal, after starting the server)




> [!IMPORTANT]
> Coming soon!!!! 

