import { FC } from 'react';
import { Photo } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../Users/usersSlice.ts';
import { isPhotosDeleting } from '../photosSlice.ts';

const PhotosItem: FC<Photo> = ({
  _id,
  title,
  userId,
  image,
  onAuthorClick,
}) => {
  const user = useAppSelector(selectUser);
  const location = useLocation();
  const isDeleting = useAppSelector(isPhotosDeleting);

  const isByUser = location.pathname.includes('photos');
  const isYours = user?._id === userId._id;
  const isAdmin = user?.role === 'admin';

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }

  const authorClickHandler = () => {
    onAuthorClick(userId._id);
  };
  return (
    <Card>
      <CardMedia
        component="img"
        alt={`${title}'s image`}
        height="140"
        image={cardImage}
      />
      <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
        <Typography gutterBottom component="div" noWrap>
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
