import React from 'react';
import { IVideo } from '../type';
import { Box, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const ChannelCard = ({ item }: { item: IVideo }) => {
  return (
    <Box
      sx={{
        width: { md: 382, xs: 318 },
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <CardMedia
        component='img'
        height='182'
        image={item?.snippet?.thumbnails?.high?.url}
        alt={item?.snippet?.title || 'image'}
        sx={{ borderRadius: '100%', width: '182px' }}
      />
      <Link
        to={`channel/${item.id.channelId}`}
        style={{
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontSize: '20px' }}>
          {item?.snippet?.title || 'title'}
        </Typography>
        <CheckCircleIcon
          sx={{ height: '15px', color: '#ffffff5f' }}
        />
      </Link>
    </Box>
  );
};

export default ChannelCard;
