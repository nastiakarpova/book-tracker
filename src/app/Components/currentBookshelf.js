"use client"

import Image from 'next/image'
import styles from '../page.module.css'

export default function CurrentBookshelf({currentBooks, confirmToDelete}) {

    return(
        <>
                <div className={styles.currentBookshelf}>
            
                {currentBooks && currentBooks.map(currentBook => (
                        <div key={currentBook.id} className={styles.cards}>
                            <div className={styles.card}>
                                
                                <div>
                                    <Image
                                    src={currentBook.imageLinks && currentBook.imageLinks.thumbnail}
                                    alt={currentBook.title}
                                    width={102}
                                    height={152}
                                    className={styles["book-image"]}
                                    />
                                </div>
                                
                                <div className={styles["book-info"]}>
                                    <div className={styles["book-title-authors"]}>
                                        <p className={styles["p-title"]}>{currentBook.title}</p>
                                        <p className={styles["p-authors"]}>{currentBook.authors}</p>
                                    </div>
                                    <button 
                                        className={styles["btn-delete"]}
                                        onClick={() => confirmToDelete(currentBook.title, "current")}>
                                            Remove
                                    </button>                                    
                                </div>
                                
                            </div>
                        </div>
                    ))}
                    <button 
                        className={styles["btn-fab"]}
                            onClick={() => console.log("clicked")}>
                            +
                    </button>
            </div>
      </>
    )
}