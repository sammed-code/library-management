const express = require('express');

// Importing routes
const userRouter = require('./routes/users');
const booksRouter = require('./routes/books');

const app = express();
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