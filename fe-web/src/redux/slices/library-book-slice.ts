import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Book {
  id: string;
  title: string;
  author: string;
  imageUrl: string;
  bookUrl: string;
  wishlist: boolean;
}

interface LibraryBookState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: LibraryBookState = {
  books: [],
  loading: false,
  error: null,
};

const libraryBookSlice = createSlice({
  name: "libraryBook",
  initialState,
  reducers: {
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action: PayloadAction<Book[]>) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    addBookRequest: (state, _action: PayloadAction<Book>) => {
      state.loading = true;
    },
    addBookSuccess: (state, action: PayloadAction<Book>) => {
      state.loading = false;
      state.books.push(action.payload);
    },
    addBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookRequest: (state, _action: PayloadAction<Book>) => {
      state.loading = true;
    },
    updateBookSuccess: (state, action: PayloadAction<Book>) => {
      state.loading = false;
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    updateBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteBookRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteBookSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.books = state.books.filter((book) => book.id !== action.payload);
    },
    deleteBookFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },

    toggleWishlistRequest: (
      state,
      _action: PayloadAction<{ id: string; wishlist: boolean }>
    ) => {
      state.loading = true;
    },
    toggleWishlistSuccess: (state, action: PayloadAction<Book>) => {
      state.loading = false;
      const index = state.books.findIndex(
        (book) => book.id === action.payload.id
      );
      if (index !== -1) {
        state.books[index] = action.payload;
      }
    },
    toggleWishlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  addBookRequest,
  addBookSuccess,
  addBookFailure,
  updateBookRequest,
  updateBookSuccess,
  updateBookFailure,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
  toggleWishlistRequest,
  toggleWishlistSuccess,
  toggleWishlistFailure,
} = libraryBookSlice.actions;

export default libraryBookSlice.reducer;
