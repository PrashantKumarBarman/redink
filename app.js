let express = require('express');
require('dotenv').config();
let postRouter = require('./routes/post');

let app = express();
let port = process.env.port | 8080;

app.use(express.json());
app.use('/post', postRouter);

app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});

module.exports = app;