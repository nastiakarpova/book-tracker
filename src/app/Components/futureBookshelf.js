"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { useEffect, useState } from "react"

export default function FutureBookshelf({books}) {

    let listOfBooks = books.items;
    let storedBooks;

    useEffect(() => {
        storedBooks = JSON.parse(localStorage.getItem("books"));
    }, [])

    const [availableBooks, setAvailableBooks] = useState(listOfBooks);
    const [futureBooks, setFutureBooks] = useState(storedBooks ? storedBooks : []);
    // const [isOpen, setIsOpen] = useState(false);

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
            <h1>Next I'll be reading</h1>
            <div className={styles.futureBookshelf}>

                {futureBooks && futureBooks.map(futureBook => (
                    <div key={futureBook.id}>
                        <Image
                            src={futureBook.imageLinks && futureBook.imageLinks.thumbnail}
                            alt={futureBook.title}
                            width={160}
                            height={240}
                        />
                        <button 
                            onClick={() => handleDeletedBook(futureBook.title)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}