import { Photo, ValidationError } from "../../types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createPhoto,
  deletePhoto,
  fetchPhotos,
  fetchPhotosForOneUser,
} from "./photosThunk.ts";
import { RootState } from "../../app/store.ts";

interface IPhotosState {
  photos: Photo[];
  fetchLoading: boolean;
  createLoading: boolean;
  deleteLoading: boolean;
  createError: ValidationError | null;
}

const initialState: IPhotosState = {
  photos: [],
  fetchLoading: false,
  createLoading: false,
  deleteLoading: false,
  createError: null,
};

export const selectPhotoItems = (state: RootState) => state.photos.photos;
export const selectFetchLoading = (state: RootState) =>
  state.photos.fetchLoading;
export const selectCreateLoading = (state: RootState) =>
  state.photos.createLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.photos.deleteLoading;
export const selectError = (state: RootState) => state.photos.createError;

export const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotos.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchPhotos.fulfilled, (state, { payload: photos }) => {
        state.fetchLoading = false;
        state.photos = photos;
      })
      .addCase(fetchPhotos.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(fetchPhotosForOneUser.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(
        fetchPhotosForOneUser.fulfilled,
        (state, { payload: photos }) => {
          state.fetchLoading = false;
          state.photos = photos;
        },
      )
      .addCase(fetchPhotosForOneUser.rejected, (state) => {
        state.fetchLoading = false;
      })
      .addCase(deletePhoto.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.deleteLoading = false;
      })
      .addCase(createPhoto.pending, (state) => {
        state.createLoading = true;
        state.createError = null;
      })
      .addCase(createPhoto.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createPhoto.rejected, (state, { payload: error }) => {
        state.createLoading = false;
        state.createError = error || null;
      });
  },
});

export const photosReducer = photosSlice.reducer;
