import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Box,
  Stack,
  Typography,
  CircularProgress,
} from '@mui/material';
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { IVideo, IVideoDetail } from '../type';
import { fetchFromAPI } from '../utils/fetchFromApi';
import Videos from './Videos';

const VideoDetail = () => {
  const { videoId } = useParams();
  const [id, setId] = useState('');
  const [videoDetail, setDetail] = useState<IVideoDetail>();
  const [loading, setLoading] = useState(false);
  const [videosChannel, setVideosChannel] = useState<IVideo[]>([]);

  const handleScroll = () => {
    document
      .querySelector('#scrollId')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  useEffect(() => {
    if (videoId) {
      setId(videoId);
    }
  }, [videoId]);
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { items }: { items: IVideoDetail[] } =
          await fetchFromAPI(
            `videos?part=snippet,statistics&id=${id}`
          );
        if (items && items[0]?.snippet?.channelId) {
          const { items }: { items: IVideo[] } = await fetchFromAPI(
            `search?part=snippet&relatedToVideoId=${id}&type=video`
          );
          setVideosChannel(items);
        }
        if (items && items[0]) {
          setDetail(items[0]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    })();
  }, [id]);

  useEffect(() => {
    const player = document.querySelector('.react-player div iframe');
    const getAttributePlayer = player?.getAttribute('sandbox');
    const a = player?.setAttribute(
      'sandbox',
      `${getAttributePlayer} allow-presentation`
    );
  }, []);
  return (
    <Stack
      sx={{
        height: '100%',
        flexDirection: { md: 'row', xs: 'column' },
        gap: 2,
      }}
    >
      {!loading && videosChannel?.length > 0 ? (
        <>
          <Box sx={{ flex: 1 }} id='scrollId'>
            <ReactPlayer
              className='react-player'
              controls
              width='100%'
              height='77vh'
              url={`https://www.youtube.com/watch?v=${videoId}`}
            />
            <Box sx={{ color: '#fff', px: 2, pt: 1 }}>
              <Typography variant='h5' fontWeight='600'>
                {videoDetail?.snippet?.title || 'title'}
              </Typography>

              <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
              >
                <Link
                  to={`/channel/${videoDetail?.snippet?.channelId}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '5px',
                    marginTop: '10px',
                    color: '#fff',
                  }}
                >
                  <Typography variant='body1'>
                    {videoDetail?.snippet?.channelTitle || 'author'}
                  </Typography>
                  <CheckCircleIcon
                    sx={{ height: '15px', color: '#ffffff59' }}
                  />
                </Link>

                <Box
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  gap={2}
                  color='#ffffff8c'
                >
                  <Typography variant='body1'>
                    {videoDetail?.statistics?.viewCount || 0} views
                  </Typography>
                  <Typography variant='body1'>
                    {videoDetail?.statistics?.likeCount || 0} likes
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ height: '77vh', overflowY: 'scroll' }}>
            <Videos
              widthCard={320}
              classes={'column'}
              videos={videosChannel}
              handleScroll={handleScroll}
            />
          </Box>
        </>
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
    </Stack>
  );
};

export default VideoDetail;
