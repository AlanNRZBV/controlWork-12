import  {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectUser} from "../Users/usersSlice.ts";
import {isPhotosLoading, photosState} from "./photosSlice.ts";
import {Box, CircularProgress} from "@mui/material";
import PhotosItem from "./components/PhotosItem.tsx";
import {fetchPhotos} from "./photosThunks.ts";

const Photos = () => {
  const dispatch = useAppDispatch()
  const user = useAppSelector(selectUser)
  const photos = useAppSelector(photosState)
  const isLoading = useAppSelector(isPhotosLoading)

  useEffect(() => {
    dispatch(fetchPhotos())
  }, [dispatch]);


  const mainContent = photos.map((item) => (
      <PhotosItem key={item._id} userId={item.userId} _id={item._id} title={item.title} image={item.image}/>
  ));

  return (
      <Box
          gridArea="body"
          mt={2}
          display="grid"
          gridTemplateColumns="repeat(6, 1fr)"
          gap={2}
      >
        {isLoading ? <CircularProgress /> : mainContent}
      </Box>
  );
};

export default Photos;