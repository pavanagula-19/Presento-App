import { RootState } from "../store";

export const selectSharedNotes = (state: RootState) => state.sharedNote.sharedNotes;
export const selectReceivedNotes = (state: RootState) => state.sharedNote.receivedNotes;
export const selectShareNoteLoading = (state: RootState) => state.sharedNote.loading;
export const selectShareNoteError = (state: RootState) => state.sharedNote.error;

