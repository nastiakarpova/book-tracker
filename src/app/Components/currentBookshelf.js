"use client"

import Image from 'next/image'
import styles from '../page.module.css'

export default function CurrentBookshelf({currentBooks, confirmToDelete}) {

    return(
        <div className={styles.currentBookshelf}>
            <h1>Currently I'm reading</h1>
            <div className={styles.book}>
            
                {currentBooks && currentBooks.map(currentBook => (
                        <div key={currentBook.id}>
                            <Image
                                src={currentBook.imageLinks && currentBook.imageLinks.thumbnail}
                                alt={currentBook.title}
                                width={160}
                                height={240}
                            />
                            <button 
                                onClick={() => confirmToDelete(currentBook.title, "current")}>Delete</button>
                        </div>
                    ))}
            </div>
      </div>
    )
}