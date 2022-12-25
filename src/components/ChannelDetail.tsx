import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  CardMedia,
  Typography,
  CircularProgress,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IChannelDetail, IVideo } from '../type';
import { fetchFromAPI } from '../utils/fetchFromApi';
import Videos from './Videos';

const ChannelDetail = () => {
  const { channelId } = useParams();
  const [channel, setChannel] = useState<IChannelDetail>();
  const [videos, setVideos] = useState<IVideo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { items }: { items: IChannelDetail[] } =
          await fetchFromAPI(
            `channels?part=snippet,statistics&id=${channelId}`
          );
        if (items && items[0]) {
          setChannel(items[0]);
        }

        const { items: data }: { items: IVideo[] } =
          await fetchFromAPI(
            `search?part=snippet%2Cid&order=date&channelId=${channelId}&order=date`
          );
        setVideos(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [channelId]);

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      {!loading && channel && videos.length > 0 ? (
        <Box
          display='flex'
          flexDirection='column'
          alignItems='center'
        >
          <Box
            className='gradient'
            width='100%'
            sx={{ height: 300 }}
          ></Box>
          <Box
            sx={{
              width: { md: 382, xs: 318 },
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              mt: -10,
            }}
          >
            <CardMedia
              component='img'
              height='182'
              image={channel?.snippet?.thumbnails?.high?.url}
              alt={channel?.snippet?.title || 'image'}
              sx={{ borderRadius: '100%', width: '182px' }}
            />
            <Box
              sx={{
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Typography sx={{ fontSize: '18px' }}>
                {channel?.snippet?.title || 'title'}
              </Typography>
              <CheckCircleIcon
                sx={{ height: '15px', color: '#ffffff5f' }}
              />
            </Box>
            <Typography sx={{ color: '#ffffff5f' }} variant='body1'>
              {new Intl.NumberFormat('en-US').format(
                Number(channel?.statistics?.subscriberCount)
              )}{' '}
              Subscribers
            </Typography>
          </Box>

          <Box mt={4}>
            <Videos
              widthCard={320}
              classes={'row'}
              videos={videos}
              handleScroll={() => {}}
            />
          </Box>
        </Box>
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
  );
};

export default ChannelDetail;
