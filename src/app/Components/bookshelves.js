"use client"

import CurrentBookshelf from './currentBookshelf';
import FutureBookshelf from './futureBookshelf';
import SearchResults from './searchResults';

export default function Bookshelves({books}) {

    return (
        <>
            <CurrentBookshelf 
                books={books}
            />
            <FutureBookshelf 
                books={books}
            />
            <SearchResults
                books={books}
            />
      </>
    )
}