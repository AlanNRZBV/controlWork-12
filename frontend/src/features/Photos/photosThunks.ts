import {createAsyncThunk} from "@reduxjs/toolkit";
import {PhotosResponse} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchPhotos = createAsyncThunk<PhotosResponse>('photos/fetch', async()=>{
  try{
    const response = await axiosApi.get('/photos')
    return  response.data
  }catch (e) {
    console.log('Caught on try - FETCH ALL PHOTOS - ',e)
  }

})