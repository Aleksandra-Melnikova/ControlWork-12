import { Photo } from '../../types';
import { createSlice } from "@reduxjs/toolkit";
import {
  deletePhoto,
  fetchPhotos, fetchPhotosForOneUser,

} from './photosThunk.ts';
import { RootState } from "../../app/store.ts";

interface IPhotosState {
  photos: Photo[];
  fetchLoading: boolean;
  // createLoading: boolean;
  // oneCocktail: DetailCocktail | null;
  // fetchOneLoading: boolean;
  deleteLoading: boolean;
}

const initialState: IPhotosState = {
  photos: [],
  fetchLoading: false,
  // createLoading: false,
  // oneCocktail: null,
  // fetchOneLoading: false,
  deleteLoading: false,
};

export const selectPhotoItems = (state: RootState) =>
  state.photos.photos;
export const selectFetchLoading = (state: RootState) =>
  state.photos.fetchLoading;
// export const selectCreateLoading = (state: RootState) =>
//   state.cocktails.createLoading;
// export const selectOneCocktail = (state: RootState) =>
//   state.cocktails.oneCocktail;
// export const selectFetchOneLoading = (state: RootState) =>
//   state.cocktails.fetchOneLoading;
export const selectDeleteLoading = (state: RootState) =>
  state.photos.deleteLoading;

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
      // .addCase(getCocktail.pending, (state) => {
      //   state.fetchOneLoading = true;
      // })
      // .addCase(getCocktail.fulfilled, (state, { payload: cocktail }) => {
      //   state.fetchOneLoading = false;
      //   state.oneCocktail = cocktail;
      // })
      // .addCase(getCocktail.rejected, (state) => {
      //   state.fetchOneLoading = false;
      // })
      .addCase(deletePhoto.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deletePhoto.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deletePhoto.rejected, (state) => {
        state.deleteLoading = false;
      })
      //
      // .addCase(createCocktail.pending, (state) => {
      //   state.createLoading = true;
      // })
      // .addCase(createCocktail.fulfilled, (state) => {
      //   state.createLoading = false;
      // })
      // .addCase(createCocktail.rejected, (state) => {
      //   state.createLoading = false;
      // })
  },
});

export const photosReducer = photosSlice.reducer;
