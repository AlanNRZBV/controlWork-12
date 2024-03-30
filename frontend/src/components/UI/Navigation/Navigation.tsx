import { AppBar, Box, Button, Modal, Toolbar, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { selectUser } from '../../../features/Users/usersSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import UserMenu from './UserMenu.tsx';
import AnonymousMenu from './AnonymousMenu.tsx';
import { useState } from 'react';
import {
  photosViewState,
  toggleView,
} from '../../../features/Photos/photosSlice.ts';
import { fetchPhotos } from '../../../features/Photos/photosThunks.ts';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -90%)',
  width: '50%',
  maxWidth: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Navigation = () => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const clickHandler = () => {
    dispatch(fetchPhotos());
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography
          onClick={clickHandler}
          to="/"
          component={NavLink}
          variant="h6"
          color="white"
          sx={{ mr: 'auto', textDecoration: 'none' }}
        >
          Gallery!
        </Typography>
        <Box display="flex">
          {user ? (
            <Button
              onClick={handleOpen}
              color="warning"
              variant="contained"
              sx={{ mr: 2 }}
            >
              Add cocktail
            </Button>
          ) : (
            <></>
          )}
          {user ? <UserMenu user={user} /> : <AnonymousMenu />}
        </Box>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}></Box>
        </Modal>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
