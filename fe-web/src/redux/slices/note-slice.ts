import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  notes: any[];
  loading: boolean;
  error: string | null;
  noteId?: string;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
  noteId: undefined,
};

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    fetchNotesRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
      state.error = null;
    },
    fetchNotesSuccess: (state, action: PayloadAction<any[]>) => {
      state.loading = false;
      state.notes = action.payload;
    },
    fetchNotesFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    createNoteRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    createNoteSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.notes.push(action.payload);
    },
    createNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateNoteRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    updateNoteSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      const index = state.notes.findIndex(
        (note) => note._id === action.payload?._id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    updateNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteNoteRequest: (state, _action: PayloadAction<string>) => {
      state.loading = true;
    },
    deleteNoteSuccess: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.notes = state.notes.filter((note) => note._id !== action.payload);
    },
    deleteNoteFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    saveCurrentNoteId(state, action: PayloadAction<string | undefined>) {
      return { ...state, noteId: action.payload };
    },
    // New actions for wishlist
    updateWishlistRequest: (state, _action: PayloadAction<any>) => {
      state.loading = true;
    },
    updateWishlistSuccess: (state, action: PayloadAction<any>) => {
      state.loading = false;
      const index = state.notes.findIndex(
        (note) => note._id === action.payload?._id
      );
      if (index !== -1) {
        state.notes[index] = action.payload;
      }
    },
    updateWishlistFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchNotesRequest,
  fetchNotesSuccess,
  fetchNotesFailure,
  createNoteRequest,
  createNoteSuccess,
  createNoteFailure,
  updateNoteRequest,
  updateNoteSuccess,
  updateNoteFailure,
  deleteNoteRequest,
  deleteNoteSuccess,
  deleteNoteFailure,
  saveCurrentNoteId,
  updateWishlistRequest,
  updateWishlistSuccess,
  updateWishlistFailure,
} = noteSlice.actions;

export default noteSlice.reducer;
