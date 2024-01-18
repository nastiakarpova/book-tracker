"use client"

import styles from '../page.module.css'
import {useState} from "react"

export default function SearchResults({availableBooks, onAddBook}) {

    const [isOpen, setIsOpen] = useState(false);

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
                                <>
                                    <li 
                                        key={index}
                                    >
                                        {book.title}
                                    </li> 
                                    <button onClick={() => onAddBook(book.title, "current")}>Add to "Reading"</button>
                                    <button onClick={() => onAddBook(book.title, "future")}>Add to "To read"</button>
                                </>
                            ))}
                        </ul>
                    )}
        </>
    )
}