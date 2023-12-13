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

      <div className={styles.bookshelves}>
        <h1>Currently I'm reading</h1>
        <div className={styles.book}>
          <Image
            src={books.items[0].imageLinks.smallThumbnail}
            alt={books.items[0].title}
            width={120}
            height={190}
          />
        </div>
      </div>

    </main>
  )
}
