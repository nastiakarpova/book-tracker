"use client"

import Image from 'next/image'
import styles from '../page.module.css'
import { useState } from "react"

export default function FutureBookshelf({books}) {

    let listOfBooks = books.items;

    const [availableBooks, setAvailableBooks] = useState(listOfBooks);
    const [futureBooks, setFutureBooks] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    function handleSelectedBook(bookName) {
        const selectedBook = availableBooks.filter(book => book.title === bookName)[0];
        futureBooks.length === 0 ? setFutureBooks([selectedBook]) : setFutureBooks(oldbooks => [...oldbooks, selectedBook]);
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
                    </div>
                ))}

                <button 
                    className={styles["btn-add"]}
                    onClick={handleClick}
                >{isOpen ? "Close" : "Open"}</button>
                {isOpen && (
                    <ul>
                        {availableBooks.map((item, index) => (
                            <li 
                                key={index}
                                onClick={() => handleSelectedBook(item.title)}>
                                    {item.title}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </>
    )
}