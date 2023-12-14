import Image from 'next/image'
import styles from './page.module.css'
import { promises as fs } from 'fs';

export default async function Home() {

  const data = await fs.readFile(process.cwd() + "/src/app/data/books.json");
  let books = JSON.parse(data);

  return (
    <main className={styles.main}>
      
      <div className={styles.logo}>
        <Image 
          src='/books.png' 
          alt="ShelfSpace Logo"
          className='{styles.vercelLogo}'
          width={50}
          height={50} 
        />
        <div className={styles.name}>ShelfSpace</div>
      </div>

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
      
    

    </main>
  )
}
