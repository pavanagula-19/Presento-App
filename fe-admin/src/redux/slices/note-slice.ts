import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface NoteState {
  notes: any[];
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
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
        (note) => note.id === action.payload.id
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
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
    deleteNoteFailure: (state, action: PayloadAction<string>) => {
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
} = noteSlice.actions;

export default noteSlice.reducer;