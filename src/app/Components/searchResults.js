"use client"

import styles from '../page.module.css'
import {useState} from "react"

export default function SearchResults({availableBooks, onAddFutureBook}) {

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
                                    <button>Add to "Reading"</button>
                                    <button onClick={() => onAddFutureBook(book.title)}>Add to "To read"</button>
                                </>
                            ))}
                        </ul>
                    )}
        </>
    )
}