### Kindly follow the below steps to run the application

- Extract the zip file
- The code is in redink-assessment folder
- Cd into the folder
- Import "redink.sql" file present in the main folder into mysql database
- Update the database and application port setting in ".env" file, default is 8080
- Run `npm install` command from the terminal
- Run `node app.js` or `nodemon` or `npm run start` command from the terminal it will start the node application server.
- Import the file named "Redink post.postman_collection.json" into postman, it contains postman collection
- You can test the application through postman collection now.

#### Api endpoints -

- **Add a post** - '/post', method - post, author has to be a valid email address, will return id of the new inserted post

- **Get all posts** - '/post', method - get

- **Get all posts by author** - '/post/author/:author', method - get, here author is email address of the author, author has to in a valid email address format

- **Update a post** - '/post/:id', method - put, here id is the post id, can update title, description, author, author has to be a valid email address

- **Delete a post** - '/post/:id', method - delete, here id is the post id
