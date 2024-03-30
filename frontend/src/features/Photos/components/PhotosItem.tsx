import {FC} from 'react';
import {Photo} from "../../../types";
import {apiURL} from "../../../constants.ts";
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import {Card, CardContent, CardMedia, Typography} from "@mui/material";

const PhotosItem:FC<Photo> = ({_id,title,userId,image}) => {

  let cardImage = imageNotAvailable;

  if (image) {
    cardImage = apiURL + '/' + image;
  }
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
            <Typography variant="body2" color="text.secondary" noWrap={true}>
              {userId.displayName}
            </Typography>
          </CardContent>

      </Card>
  );
};

export default PhotosItem;