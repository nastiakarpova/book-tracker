"use client"

import Image from 'next/image'
import styles from '../page.module.css'

export default function CurrentBookshelf({books}) {

    return(
        <div className={styles.currentBookshelf}>
            <h1>Currently I'm reading</h1>
            <div className={styles.book}>
            <Image
                src={books.items[0].imageLinks.thumbnail}
                alt={books.items[0].title}
                width={160}
                height={240}
            />
            </div>
      </div>
    )
}