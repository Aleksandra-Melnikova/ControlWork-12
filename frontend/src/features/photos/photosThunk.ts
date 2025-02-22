import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Photo } from '../../types';

export const fetchPhotos = createAsyncThunk<Photo[], void>(
  "photos/fetchPhotos",
  async () => {
    const photosResponse = await axiosApi<Photo[]>("/photos");
    return photosResponse.data || [];
  },
);

export const fetchPhotosForOneUser = createAsyncThunk<Photo[], string>(
  "photos/fetchPhotosForOneUser",
  async (id) => {
    const photoResponse = await axiosApi<Photo[]>(
      "/photos?userID=" + id,
    );
    return photoResponse.data || [];
  },
);
//
// export const getCocktail = createAsyncThunk<DetailCocktail, string>(
//   "cocktails/getCocktail",
//   async (id) => {
//     const response = await axiosApi.get<DetailCocktail>(`/cocktails/${id}`);
//     return response.data;
//   },
// );
// export const createCocktail = createAsyncThunk<
//   void,
//   CocktailMutation,
//   { state: RootState }
// >("cocktails/createCocktail", async (cocktailMutation, { getState }) => {
//   const formData = new FormData();
//   const token = getState().users.user?.token;
//
//   const keys = Object.keys(cocktailMutation) as (keyof CocktailMutation)[];
//
//   keys.forEach((key) => {
//     const value = cocktailMutation[key];
//
//     if (value !== null) {
//       formData.append(key, value);
//     }
//   });
//   console.log(formData);
//   await axiosApi.post("/cocktails", formData, {
//     headers: { Authorization: token },
//   });
// });
export const deletePhoto = createAsyncThunk<void, string>(
  "photos/deletePhoto",
  async (id) => {
    return axiosApi.delete(`/photos/${id}`, {});
  },
);
//
// export const publishCocktail = createAsyncThunk<void, string>(
//   "cocktails/publishCocktail",
//   async (id) => {
//     return axiosApi.patch(`/cocktails/${id}/togglePublished`, {});
//   },
// );
