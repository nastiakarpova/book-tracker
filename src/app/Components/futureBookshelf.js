"use client"

import Image from 'next/image'
import styles from '../page.module.css'

export default function FutureBookshelf({books}) {

    return (
        <div className={styles.futureBookshelf}>
            <h1>Next I'll be reading</h1>
            <div className={styles.book}>
            <Image
                src={books.items[1].imageLinks.thumbnail}
                alt={books.items[1].title}
                width={160}
                height={240}
            />
            </div>
            <div className={styles.book}>
            <Image
                src={books.items[2].imageLinks.thumbnail}
                alt={books.items[2].title}
                width={160}
                height={240}
            />
            </div>
            <div className={styles.book}>
            <Image
                src={books.items[3].imageLinks.thumbnail}
                alt={books.items[3].title}
                width={160}
                height={240}
            />
            </div>
            <button className={styles["btn-add"]}>+</button>
      </div>
    )
}