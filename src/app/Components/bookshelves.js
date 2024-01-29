"use client"

import CurrentBookshelf from './currentBookshelf';
import FutureBookshelf from './futureBookshelf';
import SearchResults from './searchResults';
import { useEffect, useState } from "react"


export default function Bookshelves({books}) {

    let listOfBooks = books.items;

    const [availableBooks, setAvailableBooks] = useState(listOfBooks);
    const [isCurrentDataLoaded, setIsCurrentDataLoaded] = useState(false);
    const [isFutureDataLoaded, setIsFutureDataLoaded] = useState(false);

    const [futureBooks, setFutureBooks] = useState(() => {
        if (typeof window === "undefined") {
            return [];
        }
        const savedBooks = localStorage.getItem("futureBooks");
        return savedBooks ? JSON.parse(savedBooks) : [];
    });

    const [currentBooks, setCurrentBooks] = useState(() => {
        if (typeof window === "undefined") {
            return [];
        }
        const savedCurrentBooks = localStorage.getItem("currentBooks");
        return savedCurrentBooks ? JSON.parse(savedCurrentBooks) : [];
    })

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("currentBooks");
            const savedBooks = saved ? JSON.parse(saved) : [];
            console.log("extracting from localStorage..")
            console.log(savedBooks);

            if (savedBooks) {
                setCurrentBooks(savedBooks);
                setIsCurrentDataLoaded(true);
                setAvailableBooks(oldBooks => {
                    const savedTitles = new Set(savedBooks.map(book => book.title));
                    return oldBooks.filter(book => !savedTitles.has(book.title));
                });
            }
        }
    }, [])

    useEffect(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("futureBooks");
            const savedBooks = saved ? JSON.parse(saved) : [];
            console.log("extracting from localStorage..")
            console.log(savedBooks);

            if (savedBooks) {
                setFutureBooks(savedBooks);
                setIsFutureDataLoaded(true);
                setAvailableBooks(oldBooks => {
                    const savedTitles = new Set(savedBooks.map(book => book.title));
                    return oldBooks.filter(book => !savedTitles.has(book.title));
                });
            }
        }
    }, [])

    useEffect(() => {
        console.log("Updating localStorage with current books: ", currentBooks);
        localStorage.setItem("currentBooks", JSON.stringify(currentBooks));
    },[currentBooks]);

    useEffect(() => {
            console.log("Updating localStorage with future books: ", futureBooks);
            localStorage.setItem("futureBooks", JSON.stringify(futureBooks));
    },[futureBooks]);


    function handleSelectedBook(bookName, shelf) {
        const selectedBook = availableBooks.filter(book => book.title === bookName)[0];

        if (shelf === "current") {
            currentBooks.length === 0 ? setCurrentBooks([selectedBook]) : setCurrentBooks(oldBooks => [...oldBooks, selectedBook]);
        setAvailableBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));

        } else if (shelf === "future") {
            futureBooks.length === 0 ? setFutureBooks([selectedBook]) : setFutureBooks(oldBooks => [...oldBooks, selectedBook]);
//check type of futureBooks
        setAvailableBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
        }
    } 

    function handleDeletedBook(bookName, shelf) {
        if (shelf === "current") {
            const selectedBook = currentBooks.filter(book => book.title === bookName)[0];
            setCurrentBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
            setAvailableBooks(oldBooks => [...oldBooks, selectedBook]);
        } else if (shelf === "future") {
            const selectedBook = futureBooks.filter(book => book.title === bookName)[0];
            setFutureBooks(oldBooks => oldBooks.filter(book => book.title !== bookName));
            setAvailableBooks(oldBooks => [...oldBooks, selectedBook]);
        }
    }

    function confirmToDelete(bookName, shelf) {
        if(window.confirm("Are you sure you want to delete this book?")) {
            handleDeletedBook(bookName, shelf);
        }
    }

    return (
        <>
            {isCurrentDataLoaded ? (
                <CurrentBookshelf 
                currentBooks={currentBooks}
                confirmToDelete={confirmToDelete}
            />
            ) : (
                <div>Loading...</div>
            )}
            
            {isFutureDataLoaded ? (
                <FutureBookshelf 
                    futureBooks={futureBooks}
                    confirmToDelete={confirmToDelete}
            />
            ) : (
                <div>Loading...</div>
            )}
            <SearchResults
                availableBooks={availableBooks}
                onAddBook={handleSelectedBook}
            />
      </>
    )
}
