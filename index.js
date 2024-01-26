const express = require('express');
const dotenv = require('dotenv');

// DB Connection
const DbConnection = require('./dbConnection')

// Importing routes
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');

dotenv.config();

const app = express();

DbConnection();

app.use(express.json());

const port = 8081;

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Server is up and running..."
    })
})

app.use("/users", userRouter);
app.use("/books", booksRouter);

app.all("*", (req, res) => {
    res.status(500).json({
        message: "This route does not exist"
    })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})