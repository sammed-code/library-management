const {BookModal, UserModal} = require('../models');
const IssuedBook = require('../DTOs/book-dto')

exports.getAllBooks = async (req, res) => {
    const books = await BookModal.find();

    if (books.length === 0) {
        return res.status(404).json({
            success: false,
            message: "No Book Found"
        })
    }

    return res.status(200).json({
        success: true,
        data: books
    })
};

exports.getSingleBookById = async (req, res) => {
    const {id} = req.params;

    const book = await BookModal.findById(id);

    if (!book) {
        return res.status(404).json({
            success: false,
            message: "Book Not Found With Given ID"
        })
    }

    return res.status(200).json({
        success: true,
        data: book
    })
};

exports.getAllIssuedBooks = async (req, res) => {
    const users = await UserModal.find({
        issuedBook: {$exists: true},
    }).populate("issuedBook")

    // DTOs (Data Transform Object)
    const issuedBooks = users.map((each) => new IssuedBook(each))

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
};

exports.addNewBook = async (req, res) => {
    const {data} = req.body;

    if (!data) {
        return res.status(404).json({
            success: false,
            message: "No Data Provided"
        })
    }

    await BookModal.create(data);

    const allBooks = await BookModal.find();

    return res.status(201).json({
        success: true,
        message: allBooks
    })
};

exports.updateBookById = async (req, res) => {
    const {id} = req.params;
    const {data} = req.body;

    const updatedBook = await BookModal.findOneAndUpdate({
        _id: id
    }, data, {
        new: true
    })

    return res.status(202).json({
        success: true,
        data: updatedBook
    })
};

// module.exports = {getAllBooks, getSingleBookById};