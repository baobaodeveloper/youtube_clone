import React from 'react';
import { IVideo } from '../type';
import { Stack, Box } from '@mui/material';
import VideoCard from './VideoCard';
import ChannelCard from './ChannelCard';

const Videos = ({
  videos,
  classes,
  widthCard,
  handleScroll,
}: {
  videos: IVideo[];
  classes: string;
  widthCard: number;
  handleScroll: () => void;
}) => {
  return (
    <Stack
      sx={{
        flexDirection: {
          md: classes,
          xs: classes === 'column' ? 'row' : classes,
        },
      }}
      flexWrap='wrap'
      justifyContent='center'
      gap={2}
    >
      {videos.length > 0 &&
        videos.map((item, i) => (
          <Box key={i} onClick={handleScroll}>
            {item?.id?.videoId ? (
              <VideoCard widthCard={widthCard} item={item} />
            ) : (
              <ChannelCard item={item} />
            )}
          </Box>
        ))}
    </Stack>
  );
};

export default Videos;
