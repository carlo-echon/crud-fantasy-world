## Setting up a Database for Development Purposes
Create Database for PostgreSQL

psql -U [INSERT USER HERE] -d [INSERT DATABASE NAME HERE] -f -database.sql
This line will populate the database with the correct tables.

## Running the back-end
npm start index.js

Since we have nodemon we can edit the code while its running and the changes will take effect. 
