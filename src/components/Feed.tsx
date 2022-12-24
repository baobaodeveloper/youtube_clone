import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  CircularProgress,
  Stack,
} from '@mui/material';
import axios from 'axios';
import { fetchFromAPI } from '../utils/fetchFromApi';
import Videos from './Videos';
import { IVideo } from '../type';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';

const Feed = () => {
  const { state } = useLocation();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [search, setSearch] = useState('New');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { items } = await fetchFromAPI(
          `search?part=snippet&q=${search}`
        );
        setVideos(items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [search]);

  useEffect(() => {
    if (state) setSearch(state);
  }, [state]);

  return (
    <Stack
      spacing={2}
      sx={{
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Sidebar />
      <Box
        display='flex'
        px={2}
        flexDirection='column'
        gap={2}
        position='relative'
        sx={{ height: '92vh', overflowY: 'scroll' }}
      >
        <Box display='flex' gap={1}>
          <Typography variant='h4' fontWeight='700' color='#fff'>
            {search}
          </Typography>
          <Typography variant='h4' fontWeight='700' color='red'>
            videos
          </Typography>
        </Box>
        {videos.length > 0 && !loading ? (
          <Videos
            handleScroll={() => {}}
            widthCard={382}
            classes='row'
            videos={videos}
          />
        ) : (
          <Box
            position='fixed'
            sx={{ inset: 0 }}
            display='flex'
            justifyContent='center'
            alignItems='center'
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default Feed;
