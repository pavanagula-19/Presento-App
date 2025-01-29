import { RootState } from "../store";

export const selectSharedNotes = (state: RootState) => state.sharedNote.sharedNotes;
export const selectSharedNoteLoading = (state: RootState) => state.sharedNote.loading;
export const selectSharedNoteError = (state: RootState) => state.sharedNote.error;