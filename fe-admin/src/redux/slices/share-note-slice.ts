import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SharedNote {
  id: string;
  noteId: string;
  sharedWith: string;
  sharedBy: string;
  createdAt: Date;
}
interface CreateSharedNotePayload {
  noteId: string;
  sharedWith: string;
}
interface SharedNoteState {
  sharedNotes: SharedNote[];
  loading: boolean;
  error: string | null;
}

const initialState: SharedNoteState = {
  sharedNotes: [],
  loading: false,
  error: null,
};

const shareNoteSlice = createSlice({
  name: "sharedNote",
  initialState,
  reducers: {
    fetchSharedNotesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSharedNotesSuccess(state, action: PayloadAction<SharedNote[]>) {
      state.sharedNotes = action.payload;
      state.loading = false;
    },
    fetchSharedNotesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSharedNoteRequest(state, _action: PayloadAction<CreateSharedNotePayload>) {
      state.loading = true;
      state.error = null;
    },
    createSharedNoteSuccess(state, action: PayloadAction<SharedNote>) {
      state.sharedNotes.push(action.payload);
      state.loading = false;
    },
    createSharedNoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSharedNoteRequest(state, _action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    deleteSharedNoteSuccess(state, action: PayloadAction<string>) {
      state.sharedNotes = state.sharedNotes.filter(
        (note) => note.id !== action.payload
      );
      state.loading = false;
    },
    deleteSharedNoteFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchSharedNotesRequest,
  fetchSharedNotesSuccess,
  fetchSharedNotesFailure,
  createSharedNoteRequest,
  createSharedNoteSuccess,
  createSharedNoteFailure,
  deleteSharedNoteRequest,
  deleteSharedNoteSuccess,
  deleteSharedNoteFailure,
} = shareNoteSlice.actions;

export default shareNoteSlice.reducer;