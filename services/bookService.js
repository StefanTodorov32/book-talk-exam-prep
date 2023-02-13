const Book = require("../models/Book");

function createBook(data){
    return Book.create(data)
}
const getAllBooks = () => Book.find().lean()
const getBookById = (id) => Book.findById(id).lean()
const editBook = (id, data) => Book.findByIdAndUpdate(id, data)
const deleteBook = (id) => Book.findByIdAndDelete(id)
const wishBook = async(bookId, userId) =>{
    const foundBook = await Book.findById(bookId)
    foundBook.wishingList.push(userId)
    await foundBook.save()
    return foundBook
}
const isBookWishedByUser = async(bookId, userId) =>{
    const foundBook = await Book.findById(bookId)
    const isWished = foundBook.wishingList.some(x=> x == userId)
    return isWished
}
const getUserBooks = async(userId) =>{
    const foundBooks = await Book.find({owner: userId}).lean()
    return foundBooks
}
const getBookOwner = async(bookId, userId)=>{
    const foundBooks = await Book.findById(bookId)
    return foundBooks.owner == userId || false

}
module.exports = {
    createBook,
    getAllBooks,
    getBookById,
    editBook,
    deleteBook,
    wishBook,
    isBookWishedByUser,
    getUserBooks,
    getBookOwner
}