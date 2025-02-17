import { RootState } from "../store";

export const selectBooks = (state: RootState) => state.libraryBook.books;

export const selectBooksLoading = (state: RootState) => state.libraryBook.loading;

export const selectBooksError = (state: RootState) => state.libraryBook.error;

export const selectWishlist = (state: RootState) =>
    state.libraryBook.books.filter((book) => book.wishlist);