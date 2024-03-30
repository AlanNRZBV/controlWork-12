import { Photo } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import {
  deletePhoto,
  fetchPhotos,
  fetchPhotosByUser,
  submitPhoto,
} from './photosThunks.ts';

interface PhotosState {
  photos: Photo[];
  isLoading: boolean;
  isSubmitting: boolean;
  isDeleting: boolean;
}

export const initialState: PhotosState = {
  photos: [],

  isLoading: false,
  isSubmitting: false,
  isDeleting: false,
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPhotos.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPhotos.fulfilled, (state, { payload: data }) => {
      state.isLoading = false;
      state.photos = data.photos;
    });
    builder.addCase(fetchPhotos.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(fetchPhotosByUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPhotosByUser.fulfilled, (state, { payload: data }) => {
      state.isLoading = false;

      state.photos = data.photos;
    });
    builder.addCase(fetchPhotosByUser.rejected, (state) => {
      state.isLoading = false;
    });
    builder.addCase(deletePhoto.pending, (state) => {
      state.isDeleting = true;
    });
    builder.addCase(deletePhoto.fulfilled, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(deletePhoto.rejected, (state) => {
      state.isDeleting = false;
    });
    builder.addCase(submitPhoto.pending, (state) => {
      state.isSubmitting = true;
    });
    builder.addCase(submitPhoto.fulfilled, (state) => {
      state.isSubmitting = false;
    });
    builder.addCase(submitPhoto.rejected, (state) => {
      state.isSubmitting = false;
    });
  },
});

export const photosReducer = photosSlice.reducer;

export const photosState = (state: RootState) => state.photos.photos;

export const isPhotosLoading = (state: RootState) => state.photos.isLoading;
export const isPhotosDeleting = (state: RootState) => state.photos.isDeleting;
export const isPhotosSubmitting = (state: RootState) =>
  state.photos.isSubmitting;
