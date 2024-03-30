import React, { FC, useState } from 'react';
import { Box, TextField, Typography } from '@mui/material';
import FileInput from '../../../components/UI/FileInput/FileInput.tsx';
import { LoadingButton } from '@mui/lab';
import { isPhotosSubmitting } from '../photosSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { selectUser } from '../../Users/usersSlice.ts';
import { PhotoMutation } from '../../../types';
import { fetchPhotosByUser, submitPhoto } from '../photosThunks.ts';

interface Props {
  closeHandler: () => void;
}

const AddPhotoForm: FC<Props> = ({ closeHandler }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isSubmitting = useAppSelector(isPhotosSubmitting);
  const [state, setState] = useState<PhotoMutation>({
    title: '',
    image: null,
  });
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(submitPhoto(state)).unwrap();
      if (user) {
        await dispatch(fetchPhotosByUser(user?._id));
      }
      setState({
        title: '',
        image: null,
      });
      closeHandler();
    } catch (e) {
      console.log('Caught on try - SUBMIT FORM - ', e);
    }
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return (
    <>
      <Typography variant="body1" mb={2}>
        Add photo!
      </Typography>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        onSubmit={submitHandler}
      >
        <TextField
          type="text"
          id="title"
          label="Title"
          value={state.title}
          onChange={inputChangeHandler}
          name="title"
          sx={{ marginBottom: '16px' }}
          required
        />
        <FileInput
          label="Image"
          name="image"
          onChange={fileInputChangeHandler}
        />

        <LoadingButton
          loading={isSubmitting}
          type="submit"
          variant="contained"
          sx={{ marginTop: '16px' }}
          disabled={state.image === null || isSubmitting}
        >
          Submit
        </LoadingButton>
      </Box>
    </>
  );
};

export default AddPhotoForm;
