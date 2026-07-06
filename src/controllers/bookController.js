const Book = require('../models/Book');

// GET all books
const getBooks = async(req,res)=>{
    try{

        const books = await Book.find();

        res.json(books);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// GET book by id
const getBookById = async(req,res)=>{
    try{

        const book = await Book.findById(req.params.id);

        if(!book){
            return res.status(404).json({
                message:'Book not found'
            });
        }

        res.json(book);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// POST create book
const createBook = async(req,res)=>{
    try{

        const book = await Book.create(req.body);

        res.status(201).json(book);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// PUT update book
const updateBook = async(req,res)=>{
    try{

        const book = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );

        res.json(book);

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

// DELETE book
const deleteBook = async(req,res)=>{
    try{

        await Book.findByIdAndDelete(req.params.id);

        res.json({
            message:'Book deleted'
        });

    }catch(error){

        res.status(500).json({
            message:error.message
        });

    }
};

module.exports = {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};