"use client"

import { searchBooks } from "../actions";
import styles from '../page.module.css';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';
import Image from 'next/image'

const initialResults = {results: []};


export default function Search() {
    
    const [state, formAction] = useFormState(searchBooks, initialResults);
    const { pending } = useFormStatus();



    return (
        <>
            <form
                action={formAction}
                placeholder="Search for your next book"
            >
                <input
                    type="text"
                    name="query"
                    id="query"
                    placeholder="Search for your next book"
                    required
                />
                <button 
                    type="submit"
                    disabled={pending}>Search</button>
            </form>

            <div className={styles.currentBookshelf}>

                {state.results && state.results.map(book => (
                    <>
                    <div key={book.id} className={styles.cards}>
                        <div className={styles.card}>
                            <Image
                                src={book.imageLinks && book.imageLinks.thumbnail}
                                alt={book.title}
                                width={102}
                                height={152}
                                className={styles["book-image"]}
                            />
                        
                            <div className={styles["book-info"]}>
                                <div className={styles["book-title-authors"]}>
                                    <p className={styles["p-title"]}>{book.title}</p>
                                    <p className={styles["p-authors"]}>{book.authors}</p>
                                </div>
                                <button 
                                    className={styles["btn-delete"]}
                                    onClick={() => confirmToDelete(book.title, "current")}>
                                        Remove
                                </button>                                    
                            </div>
                        </div>
                    </div>
                </>

                    
                ))}
            </div>
        </>
    )
}