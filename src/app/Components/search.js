"use client"

import { searchBooks } from "../actions";
// import styles from '../page.module.css';
import { useFormState } from 'react-dom';
import { useFormStatus } from 'react-dom';

const initialResults = {results: []};


export default function Search() {

    console.log(searchBooks);
    
    const [state, formAction] = useFormState(searchBooks, initialResults);
    const { pending } = useFormStatus();

    console.log (state.results);

    return (
        <>
            <form
                action={formAction}
                placeholder="Search for your next book"
            >
                <input
                    type="text"
                    name="query"
                    id="query"
                    placeholder="Search for your next book"
                />
                <button 
                    type="submit"
                    disabled={pending}>Search</button>
            </form>

            <ul>
                {state.results && state.results.map(book => (
                    <li key={book.id}>
                        {book.title}
                    </li>
                ))}
            </ul>
        </>
    )
}