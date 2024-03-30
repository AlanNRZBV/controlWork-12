import { FC } from 'react';
import { Photo } from '../../../types';
import { apiURL } from '../../../constants.ts';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

const PhotosItem: FC<Photo> = ({
  _id,
  title,
  userId,
  image,
  onAuthorClick,
}) => {
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
      <CardContent>
        <Typography gutterBottom component="div" noWrap>
          {title}
        </Typography>
        <Typography
          onClick={authorClickHandler}
          component={NavLink}
          to={`/${userId._id}/photos`}
          variant="body2"
          color="text.secondary"
          noWrap={true}
        >
          {userId.displayName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PhotosItem;
