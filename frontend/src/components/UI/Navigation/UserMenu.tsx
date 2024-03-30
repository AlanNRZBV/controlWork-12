import React from 'react';
import { User } from '../../../types';
import { Box, Button, Typography } from '@mui/material';
import { useAppDispatch } from '../../../app/hooks.ts';
import { logout } from '../../../features/Users/usersThunks.ts';
import Image from 'mui-image';
import imageNotAvailable from '../../../assets/images/image_not_available.png';
import { apiURL } from '../../../constants.ts';
import { fetchPhotosByUser } from '../../../features/Photos/photosThunks.ts';
import { NavLink } from 'react-router-dom';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();

  let avatarImage = imageNotAvailable;

  if (user.avatar) {
    if (user.avatar.includes('googleusercontent')) {
      avatarImage = user.avatar;
    } else {
      avatarImage = apiURL + '/' + user.avatar;
    }
  }

  const handleClick = async () => {
    await dispatch(fetchPhotosByUser(user._id));
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box display="flex" alignItems="center">
      <Typography
        component={NavLink}
        to={`/${user._id}/photos`}
        color="inherit"
        onClick={handleClick}
        sx={{ flexShrink: '0' }}
      >
        Hello, {user.displayName}!
      </Typography>
      <Image
        src={avatarImage}
        alt={`${user.avatar} avatar`}
        style={{ width: '35px', height: '35px', borderRadius: '50%' }}
      />
      <Button onClick={handleLogout} variant="text" color="inherit">
        Logout
      </Button>
    </Box>
  );
};

export default UserMenu;
