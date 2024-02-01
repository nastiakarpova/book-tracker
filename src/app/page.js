import Image from 'next/image'
import styles from './page.module.css'
import { promises as fs } from 'fs';
import Bookshelves from './Components/bookshelves';
import Search from './Components/search';

export default async function Home() {

  const data = await fs.readFile(process.cwd() + "/src/app/data/books.json");
  let listOfBooks = JSON.parse(data);

  return (
    <main className={styles.main}>

      <div className={styles.logo}>
        <Image 
          src='/books.png' 
          alt="ShelfSpace Logo"
          width={50}
          height={50} 
        />
        <div className={styles.name}>ShelfSpace</div>
        <div>
            <Image
              src="/user.png"
              alt="Login"
              width={32}
              height={32}
            />
        </div>
      </div>

      <div className={styles.bookshelves}>
        <Bookshelves 
          books={listOfBooks}
        />
      </div>

      <Search />

    </main>
  )
}
