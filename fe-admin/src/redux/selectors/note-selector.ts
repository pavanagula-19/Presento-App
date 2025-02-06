import { RootState } from "../store";

export const selectNotes = (state: RootState) => state.note.notes;
export const selectNoteLoading = (state: RootState) => state.note.loading;
export const selectNoteError = (state: RootState) => state.note.error;
