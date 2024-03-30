import { FC, useState } from 'react';
import { Photo } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Dialog,
  Link,
  Typography,
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../Users/usersSlice.ts';
import { isPhotosDeleting } from '../photosSlice.ts';
import {
  deletePhoto,
  fetchPhotos,
  fetchPhotosByUser,
} from '../photosThunks.ts';
import Image from 'mui-image';

const PhotosItem: FC<Photo> = ({
  _id,
  title,
  userId,
  image,
  onAuthorClick,
}) => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const path = location.pathname as string;
  const isDeleting = useAppSelector(isPhotosDeleting);
  const isByUser = location.pathname.includes('photos');
  const isYours = user?._id === userId._id;
  const isAdmin = user?.role === 'admin';

  const [open, setOpen] = useState(false);

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const authorClickHandler = () => {
    onAuthorClick(userId._id);
  };

  const deleteHandler = async () => {
    await dispatch(deletePhoto(_id));
    if (path.includes('photos')) {
      dispatch(fetchPhotosByUser(userId._id));
      return;
    }
    dispatch(fetchPhotos());
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card>
      <Dialog open={open} onClose={handleClose}>
        <Image src={cardImage} alt={title} />
      </Dialog>
      <CardMedia
        onClick={handleClickOpen}
        component="img"
        alt={title}
        height="140"
        image={cardImage}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography
          onClick={handleClickOpen}
          gutterBottom
          sx={{ textDecoration: 'underline', ':hover': { cursor: 'pointer' } }}
          noWrap
        >
          {title}
        </Typography>
        <Typography
          mb={2}
          onClick={authorClickHandler}
          component={NavLink}
          to={`/${userId._id}/photos`}
          variant="body2"
          color="text.secondary"
          noWrap={true}
        >
          {userId.displayName}
        </Typography>
        <LoadingButton
          onClick={deleteHandler}
          loading={isDeleting}
          disabled={isDeleting}
          variant="contained"
          color="warning"
          sx={{
            alignSelf: 'center',
            display: (isByUser && isYours) || isAdmin ? 'inline-flex' : 'none',
          }}
        >
          Delete
        </LoadingButton>
      </CardContent>
    </Card>
  );
};

export default PhotosItem;
