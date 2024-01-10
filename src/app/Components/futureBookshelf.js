"use client"

import Image from 'next/image'
import styles from '../page.module.css'

export default function FutureBookshelf({futureBooks, onDeleteBook}) {

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
                            onClick={() => onDeleteBook(futureBook.title)}>Delete</button>
                    </div>
                ))}
            </div>
        </>
    )
}