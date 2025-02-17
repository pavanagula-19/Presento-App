import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SharedNote {
  _id: string;
  noteId: string;
  sharedWith: string;
  sharedBy: string;
  createdAt: string;
}

interface ShareNoteState {
  sharedNotes: SharedNote[];
  receivedNotes: SharedNote[];
  loading: boolean;
  error: string | null;
}

const initialState: ShareNoteState = {
  sharedNotes: [],
  receivedNotes: [],
  loading: false,
  error: null,
};

const shareNoteSlice = createSlice({
  name: "shareNote",
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

    fetchReceivedNotesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchReceivedNotesSuccess(state, action: PayloadAction<SharedNote[]>) {
      state.receivedNotes = action.payload;
      state.loading = false;
    },
    fetchReceivedNotesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },

    createSharedNoteRequest(state,_action:PayloadAction<any>) {
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

    deleteSharedNoteRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSharedNoteSuccess(state, action: PayloadAction<string>) {
      state.sharedNotes = state.sharedNotes.filter(note => note._id !== action.payload);
      state.receivedNotes = state.receivedNotes.filter(note => note._id !== action.payload);
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
  fetchReceivedNotesRequest,
  fetchReceivedNotesSuccess,
  fetchReceivedNotesFailure,
  createSharedNoteRequest,
  createSharedNoteSuccess,
  createSharedNoteFailure,
  deleteSharedNoteRequest,
  deleteSharedNoteSuccess,
  deleteSharedNoteFailure,
} = shareNoteSlice.actions;

export default shareNoteSlice.reducer;
