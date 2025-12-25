/**
 * Raw item returned by GitHub Contents API
 * (partial typing, only fields we care about)
 */
export interface GithubContentItem {
  name: string,
  url: string,
  type: 'dir' | 'file',
  size: number
}

/**
 * Programming book (folder) exposed by this library
 */
export interface ProgrammingBook {
  /** Folder name (e.g. "C++", "Python", "Visual Basic") */
  name: string,

  /** GitHub API URL to fetch the folder contents */
  url: string
}

/**
 * A programming book image
 * (Download URL can be used to display image on web browser or download it)
 */
export interface BookImage {
  name: string;
  size: number;
  /**
   * URL of the image
   */
  download_url: string;
}

/**
 * Options for fetching book images
 */
export interface GetBookImagesOptions {
  /**
   * Maximum number of images to return.
   * If not specified, all images are returned.
   */
  limit?: number;
  /**
   * Optional authorization token for GitHub API.
   * Should be passed as "Bearer TOKEN"
   */
  authToken?: string;
}

/**
 * Options for fetching books
 */
export interface GetBooksOptions {
  /**
   * Optional authorization token for GitHub API.
   * Should be passed as "Bearer TOKEN"
   */
  authToken?: string;
}

