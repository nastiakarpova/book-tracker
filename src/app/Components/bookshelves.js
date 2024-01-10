"use client"

import CurrentBookshelf from './currentBookshelf';
import FutureBookshelf from './futureBookshelf';
import SearchResults from './searchResults';
import { useEffect, useState } from "react"


export default function Bookshelves({books}) {

    let listOfBooks = books.items;
    let storedBooks;
    const [availableBooks, setAvailableBooks] = useState(listOfBooks);
    const [futureBooks, setFutureBooks] = useState(storedBooks ? storedBooks : []);

    useEffect(() => {
        storedBooks = JSON.parse(localStorage.getItem("books"));
    }, [])

    useEffect(() => {
        localStorage.setItem("books", JSON.stringify(futureBooks));
    },[futureBooks]);

    function handleSelectedBook(bookName) {
        const selectedBook = availableBooks.filter(book => book.title === bookName)[0];

        typeof(futureBooks) === null ? setFutureBooks([selectedBook]) : setFutureBooks(oldBooks => [...oldBooks, selectedBook]);
//check type of futureBooks
        setAvailableBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
    }

    function handleDeletedBook(bookName) {
        const selectedBook = futureBooks.filter(book => book.title === bookName)[0];
        setFutureBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
        setAvailableBooks(oldBooks => [...oldBooks, selectedBook]);
    }

    return (
        <>
            <CurrentBookshelf 
                books={books}
            />
            <FutureBookshelf 
                futureBooks={futureBooks}
                onDeleteBook={handleDeletedBook}
            />
            <SearchResults
                availableBooks={availableBooks}
                onAddFutureBook={handleSelectedBook}
            />
      </>
    )
}