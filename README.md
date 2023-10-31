# Todo

This repository contains a simple to app that I have created in phases. The first two are complete and hopefully I will be able to start on the third soon. Phase 1 was put together fast just to get an idea how to 
put this project together. It only handles client side Functionality, no server side code or database. Phase 2 is a Node.js Express app, with connectivity to a Mysql database and Bootstrap css. Phase 3 will be building 
off the last phase but with users and a login.  

## Table of Contents

- [Phase1](#phase1)
- [Phase2](#phase2)
- [Installation](#installation)
- [Requirements](#Requirements)
- [Database](#Database)
- [Startup](#Startup)
- [Phase3](#phase3)

## Phase1

Phase 1 is a simple client side version of the Todo app with no bells or whistles Strictly to get an idea of the project how it will work. There is no installation or setup required to view this webpage. Simply open the web page up with your default browser as you would for other web projects.

## Phase2

Phase 2 has client side JS and node.js Express server for the backend connected to a Mysql database.

### Installation

> [!TIP]
> For easy cloning it is recommended you have git installed..

Navigate to a terminal and directory you want to clone the repository in and type:

 ```bash

git clone https://github.com/Pmacdonald15/todo

```

### Requirements

Next we will need to install the Node Modules, I will list them here:

```powershell

npm install node

```

```powershell

npm install express

```

```powershell

npm install mysql2

```

```powershell

npm install dotenv

```

### Database

This project requires a My Sql database connection. After downloading and installing MySql, Configure your database and take note of the credentials. There is a file in the repository named schema.sql that has the configuration for the My Sql database. Simply copy this code in to the My Sql terminal after logging in to configure the database.

For users on windows that have set up the mysql environment variable path on your system, so that they can use the my sql command in PowerShell and prefer the command line:

1. Log in to your database terminal and run the command:

```mysql

CREATE DATABASE IF NOT EXISTS todo_app;

```

2. Open PowerShell type to the directory where to saved the project and run the command:

```bash

cd todo/phase2/server

```

3. Now run:

```mysql

mysql -u username -p password --execute="source .\schema.sql"

```

Remember to replace "username" and "password" with your My Sql database credentials.

4. This project Requires a .env file setup in the following manner to connect to the database(using the credentials that you set up the database with): 

 ```.env

MYSQL_HOST=' '
MYSQL_USER=' '
MYSQL_PASSWORD=' '
MYSQL_DATABASE='todo_app'

```

The .env file should be located inside of root directory of the project.

### Startup

If you are not already in todo/phase2/server from the above step go to the projects directory and repeat step 2 from above.

hit enter then type:

```bash

node server.js

```

Hit enter again, the server is now running. You can contact the app at localhost:4455/ or using your public Ip address after applying the appropriate port forwarding to your router.(Depending on your system you can hold control on the keyboard and click on the link, after starting the server)

## Phase3

 Coming soon!!!! 

