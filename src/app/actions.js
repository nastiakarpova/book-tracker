"use server"

export async function searchBooks(prevState, formData) {

    const query = formData.get("query");

    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`)

    const data = await response.json();

    let foundBooks = [];

    data.items.map(item => {
        foundBooks.push({
            title: item.volumeInfo.title,
            authors: item.volumeInfo.authors,
            id: item.id,
            selfLink: item.selfLink,
            publishedDate: item.volumeInfo.publishedDate,
            imageLinks: item.volumeInfo.imageLinks
        });
    })

    console.log(foundBooks);

    return {results: foundBooks};
    
}