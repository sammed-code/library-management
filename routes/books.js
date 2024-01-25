const express = require('express');

// JSON data import
const {books} = require('../data/books.json');
const {users} = require('../data/users.json');

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Desc: Get all books
 * Access: Public
 * Parameters: None
 */
router.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        data: books
    })
})

/**
 * Route: /books/:id
 * Method: GET
 * Desc: Get book by ID
 * Access: Public
 * Parameters: ID
 */
router.get("/:id", (req, res) => {
    const {id} = req.params;
    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book Not Found"
        })
    }
    return res.status(200).json({
        success: true,
        message: book
    })
})

/**
 * Route: /books/issued/books
 * Method: GET
 * Desc: Get all issued books
 * Access: Public
 * Parameters: None
 */
router.get("/issued/books", (req, res) => {
    const userWithIssuedBooks = users.filter((each) => {
        if (each.issuedBook) {
            return each;
        }
    })

    const issuedBooks = [];

    userWithIssuedBooks.forEach((each) => {
        const book = books.find((b) => b.id === each.issuedBook);

        book.issuedBy = each.name + " " + each.surname;
        book.issuedDate = each.issuedDate;
        book.returnDate = each.returnDate;

        issuedBooks.push(book);
    })

    if (issuedBooks.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No issued book yet"
        })
    }

    return res.status(200).json({
        success: true,
        data: issuedBooks
    })
})

/**
 * Route: /books
 * Method: POST
 * Desc: Create a new book
 * Access: Public
 * Parameters: none
 */
router.post("/", (req, res) => {
    const {data} = req.body;

    const book = books.find((each) => each.id === data.id)

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No Data Provided"
        })
    }
    if (book) {
        return res.status(404).json({
            success: false,
            message: "Book Already Exists With Given ID"
        })
    }
    
    const allBooks = [...books, data];

    return res.status(201).json({
        success: true,
        message: allBooks
    })
})

/**
 * Route: /books/:id
 * Method: PUT
 * Desc: Updating a book by ID
 * Access: Public
 * Parameters: ID
 */
router.put("/:id", (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const book = books.find((each) => each.id === id);
    if (!book) {
        return res.status(400).json({
            success: false,
            message: "Book Not Found"
        })
    }

    const updatedBook = books.map((each) => {
        if (each.id === id) {
            return {
                ...each,
                ...data
            }
        }
        return each;
    })

    return res.status(202).json({
        success: true,
        data: updatedBook
    })
})

module.exports = router;