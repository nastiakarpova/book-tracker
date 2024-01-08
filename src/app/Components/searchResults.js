"use client"

import styles from '../page.module.css'
import {useState} from "react"

export default function SearchResults({books}) {

    const [isOpen, setIsOpen] = useState(false);

    let listOfBooks = books.items;
    const [availableBooks, setAvailableBooks] = useState(listOfBooks);

    function handleClick() {
        setIsOpen(!isOpen);
    }

    return(
        <>
            <button
                className={styles["btn-add"]}
                onClick={handleClick}
            >{isOpen ? "Close" : "Open"}
            </button>
                    {isOpen && (
                        <ul>
                            {availableBooks.map((book, index) => (
                                <li 
                                    key={index}
                                >
                                    {book.title}
                                </li>
                            ))}
                        </ul>
                    )}
        </>
    )
}