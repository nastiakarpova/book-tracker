"use client"

import CurrentBookshelf from './currentBookshelf';
import FutureBookshelf from './futureBookshelf';
import SearchResults from './searchResults';
import { useEffect, useState } from "react"


export default function Bookshelves({books}) {

    let listOfBooks = books.items;

    const [availableBooks, setAvailableBooks] = useState(listOfBooks);
    const [isDataLoaded, setIsDataLoaded] = useState(false);

    const [futureBooks, setFutureBooks] = useState(() => {
        if (typeof window === "undefined") {
            return [];
        }
        const savedBooks = localStorage.getItem("books");
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("books");
            const savedBooks = saved ? JSON.parse(saved) : [];
            console.log("extracting from localStorage..")
            console.log(savedBooks);

            if (savedBooks) {
                setFutureBooks(savedBooks);
                setIsDataLoaded(true);
                setAvailableBooks(oldBooks => {
                    const savedTitles = new Set(savedBooks.map(book => book.title));
                    return oldBooks.filter(book => !savedTitles.has(book.title));
                });
            }
        }
    }, [])

    useEffect(() => {
            console.log("Updating localStorage with: ", futureBooks);
            localStorage.setItem("books", JSON.stringify(futureBooks));
    },[futureBooks]);

    function handleSelectedBook(bookName) {
        const selectedBook = availableBooks.filter(book => book.title === bookName)[0];

        futureBooks.length === 0 ? setFutureBooks([selectedBook]) : setFutureBooks(oldBooks => [...oldBooks, selectedBook]);
//check type of futureBooks
        setAvailableBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
    }

    function handleDeletedBook(bookName) {
        const selectedBook = futureBooks.filter(book => book.title === bookName)[0];
        setFutureBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
        setAvailableBooks(oldBooks => [...oldBooks, selectedBook]);
    }

    function confirmToDelete(bookName) {
        if(window.confirm("Are you sure you want to delete this book?")) {
            handleDeletedBook(bookName);
        }
    }

    return (
        <>
            <CurrentBookshelf 
                books={books}
            />
            {isDataLoaded ? (
                <FutureBookshelf 
                    futureBooks={futureBooks}
                    confirmToDelete={confirmToDelete}
            />
            ) : (
                <div>Loading...</div>
            )}
            <SearchResults
                availableBooks={availableBooks}
                onAddFutureBook={handleSelectedBook}
            />
      </>
    )
}