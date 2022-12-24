import { Box, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { IVideo } from '../type';
import { fetchFromAPI } from '../utils/fetchFromApi';
import Videos from './Videos';

const SearchFeed = () => {
  const { state } = useLocation();
  const [search, setSearch] = useState('');
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { items } = await fetchFromAPI(
          `search?part=snippet&q=${search}&order=date`
        );
        setVideos(items);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [search]);
  useEffect(() => {
    if (state) {
      setSearch(state);
    }
  }, [state]);

  return (
    <Box display='flex' flexDirection='column' gap={2}>
      <Box
        sx={{
          color: '#fff',
          px: 2,
          fontSize: '26px',
          fontWeight: '600',
        }}
      >
        <Box component={'span'}> Search Result for</Box>
        <Box component={'span'} sx={{ color: 'red', mx: 1 }}>
          {search}
        </Box>
        videos
      </Box>
      <Box>
        {videos.length > 0 && !loading ? (
          <Videos
            handleScroll={() => {}}
            classes={'row'}
            videos={videos}
            widthCard={382}
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
    </Box>
  );
};

export default SearchFeed;
