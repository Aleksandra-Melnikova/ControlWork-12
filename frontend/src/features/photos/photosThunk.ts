import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../../axiosApi.ts";
import { Photo, PhotoMutation, ValidationError } from "../../types";
import { RootState } from "../../app/store.ts";
import { isAxiosError } from "axios";

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
    const photoResponse = await axiosApi<Photo[]>("/photos?userID=" + id);
    return photoResponse.data || [];
  },
);

export const createPhoto = createAsyncThunk<
  void,
  PhotoMutation,
  { rejectValue: ValidationError; state: RootState }
>(
  "photos/createPhoto",
  async (photoMutation, { rejectWithValue, getState }) => {
    try {
      const formData = new FormData();
      const token = getState().users.user?.token;

      const keys = Object.keys(photoMutation) as (keyof PhotoMutation)[];

      keys.forEach((key) => {
        const value: string | File | null = photoMutation[key];

        if (
          value !== null &&
          value !== undefined &&
          value !== "undefined" &&
          value !== ""
        ) {
          formData.append(key, value);
        }
      });
      await axiosApi.post("/photos", formData, {
        headers: { Authorization: token },
      });
    } catch (error) {
      if (isAxiosError(error) && error.status === 400 && error.response) {
        return rejectWithValue(error.response.data);
      }
      throw error;
    }
  },
);

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
