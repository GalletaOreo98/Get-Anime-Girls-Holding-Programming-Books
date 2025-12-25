import type { GithubContentItem, ProgrammingBook, BookImage, GetBookImagesOptions, GetBooksOptions } from './types.js';

const BOOKS_API_URL = 'https://api.github.com/repos/cat-milk/Anime-Girls-Holding-Programming-Books';

/**
 * Fetch all programming book categories from the repository.
 *
 * Each book corresponds to a folder in the root of the repository.
 * Files such as README.md or CONTRIBUTING.md are excluded.
 *
 * @param options - Optional options such as authorization token
 * @returns A list of programming books
 * @throws Error if the GitHub API request fails
 */
export async function getAllBooks(options: GetBooksOptions = {}): Promise<ProgrammingBook[]> {
  const headers: HeadersInit = {};
  if (options.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`;
  }

  const response = await fetch(`${BOOKS_API_URL}/contents`, { headers });

  if (!response.ok) {
    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  const data = (await response.json()) as GithubContentItem[];

  return data
    .filter((item) => item.type === 'dir')
    .map((item) => ({
      name: item.name,
      url: item.url
    }));
}

/**
 * Obtains images from a specific book in the repository
 * "Anime Girls Holding Programming Books".
 *
 * @param bookName - Name of the book (e.g. "C++", "Python", "Visual Basic")
 * @param options - Optional options such as image limit
 * @returns List of images with name, size, and download URL
 *
 * @throws Error if the book does not exist or the request fails
 */
export async function getImagesByBook(
  bookName: string,
  options: GetBookImagesOptions = {},
): Promise<BookImage[]> {
  if (!bookName || !bookName.trim()) {
    throw new Error("bookName is required");
  }

  const encodedBookName: string = encodeURIComponent(bookName);
  const url: string =
    `${BOOKS_API_URL}/contents/${encodedBookName}?ref=master`;

  const headers: HeadersInit = {};
  if (options.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`;
  }

  const response: Response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Could not fetch the book "${bookName}" (status ${response.status})`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`The content of the book "${bookName}" is not valid`);
  }

  const images: BookImage[] = data
    .filter((item: any) => item?.type === "file" && typeof item.download_url === "string")
    .map((item: any) => ({
      name: item.name as string,
      size: item.size as number,
      download_url: item.download_url as string,
    }));

  if (typeof options.limit === "number" && options.limit > 0) {
    return images.slice(0, options.limit);
  }

  return images;
}

/**
 * Returns a random image from a specific programming book.
 *
 * @param bookName - The name of the book (e.g. "C++", "Python", "Visual Basic")
 * @returns A single random image with name, size and download URL
 * @param options - Optional options such as authorization token
 * @throws Error if the book does not exist, contains no images, or the request fails
 */
export async function getRandomImageByBook(
  bookName: string,
  options: GetBookImagesOptions = {},
): Promise<BookImage> {
  if (!bookName || !bookName.trim()) {
    throw new Error("bookName is required");
  }

  const encodedBookName: string = encodeURIComponent(bookName);
  const url: string =
    `${BOOKS_API_URL}/contents/${encodedBookName}?ref=master`;

  const headers: HeadersInit = {};
  if (options.authToken) {
    headers['Authorization'] = `Bearer ${options.authToken}`;
  }

  const response: Response = await fetch(url, { headers });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch book "${bookName}" (status ${response.status})`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error(`Invalid content for book "${bookName}"`);
  }

  const images: BookImage[] = data
    .filter((item: any) => item?.type === "file" && typeof item.download_url === "string")
    .map((item: any) => ({
      name: item.name as string,
      size: item.size as number,
      download_url: item.download_url as string,
    }));

  if (images.length === 0) {
    throw new Error(`No images found for book "${bookName}"`);
  }

  const randomIndex: number = Math.floor(Math.random() * images.length);

  return images[randomIndex];
}

