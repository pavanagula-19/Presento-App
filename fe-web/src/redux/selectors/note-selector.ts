import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const selectNotes = (state: RootState) => state.note.notes;
export const selectNoteLoading = (state: RootState) => state.note.loading;
export const selectNoteError = (state: RootState) => state.note.error;
export const selectNodeId = (state: RootState): string | undefined =>
  state.note.noteId;
export const selectNote = (noteId?: string) =>
  createSelector(
    (state: RootState) => state?.note?.notes,
    (state) => state?.find((data) => data?._id === noteId)
  );
