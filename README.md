# Get Anime Girls Holding Programming Books

Fetch images of anime girls holding programming books from the GitHub repository [cat-milk/Anime-Girls-Holding-Programming-Books]() via TypeScript/JavaScript simple functions and the GitHub REST API.  

## Features
- List all available programming books in the repository
- Fetch images for a specific book with optional limiting
- Get one random image from a specific book
- You can add your Github token to use authenticated requests (optional)
- TypeScript typings included

## Installation

```bash
npm i get-anime-girls-holding-programming-books
```

## Quick Start

```ts
import { getAllBooks, getImagesByBook, getRandomImageByBook } from "get-anime-girls-holding-programming-books";

// List available book folders
const books = await getAllBooks();
console.log(books.map(b => b.name));

// Fetch up to 5 images from the "Python" folder
const images = await getImagesByBook("Python", { limit: 5 });
console.log(images);

// Pick a random image from the "C++" folder
const randomImage = await getRandomImageByBook("C++");
console.log(randomImage.download_url);
```

## Reference

### `getAllBooks(options?: GetBooksOptions): Promise<ProgrammingBook[]>`
Fetches all top-level folders in the Github repository (each folder is a programming book category).

Returns items shaped like:

```ts
interface ProgrammingBook {
	name: string; // e.g., "C++", "Python", "Visual Basic"
	url: string;  // GitHub API URL for the folder contents
}
```

```ts
interface GetBooksOptions {
	authToken?: string; // Optional authorization token for GitHub API.
}
```

### `getImagesByBook(bookName: string, options?: GetBookImagesOptions): Promise<BookImage[]>`
Lists images in a specific folder (book).

- `bookName`: The folder name (case-sensitive as per the repository). Examples: "Python", "C++", "Visual Basic".
- `options.limit?`: Maximum number of images to return.

Returns items shaped like:

```ts
interface BookImage {
	name: string;
	size: number;
	download_url: string; // Direct URL you can <img src={...}/> or download
}

interface GetBookImagesOptions {
	limit?: number;
	authToken?: string;
}
```

### `getRandomImageByBook(bookName: string): Promise<BookImage>`
Fetches images from a folder and returns one randomly selected.



## Notes & Best Practices
- GitHub REST API rate limits: Unauthenticated requests are limited (commonly ~60/hour). You can add a github token to use authenticated requests (5000/hour). _"Unauthenticated requests are associated with the originating IP address, not with the user or application that made the request."_ [Learn more...](https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api)
- Folder names are derived from repository directories. Use exact names as they appear in the Github repository.
- Node.js 20+ recommended.

## Acknowledgements
- Images and folders are sourced from the excellent community repository: https://github.com/cat-milk/Anime-Girls-Holding-Programming-Books
- This library simply provides convenient typed functions to that content.


