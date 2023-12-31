import Image from 'next/image'
import styles from './page.module.css'
import { promises as fs } from 'fs';
import CurrentBookshelf from './Components/currentBookshelf';
import FutureBookshelf from './Components/futureBookshelf';

export default async function Home() {

  const data = await fs.readFile(process.cwd() + "/src/app/data/books.json");
  let listOfBooks = JSON.parse(data);

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

      <CurrentBookshelf 
        books={listOfBooks}
      />
      <FutureBookshelf 
        books={listOfBooks}
      />

      
      
    

    </main>
  )
}
