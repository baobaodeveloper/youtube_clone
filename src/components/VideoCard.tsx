import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { IVideo } from '../type';

const VideoCard = ({
  item,
  widthCard,
}: {
  item: IVideo;
  widthCard: number;
}) => {
  return (
    <Card
      sx={{
        width: { md: widthCard || 382, xs: 318 },
        backgroundColor: '#1e1e1e',
        height: '100%',
      }}
    >
      <Link to={`/video/${item?.id?.videoId}`}>
        <CardMedia
          component='img'
          height='180px'
          sx={{ width: '100%', objectFit: 'cover' }}
          image={item?.snippet?.thumbnails?.high?.url || ''}
          alt={item?.snippet?.title || 'title'}
        />
      </Link>
      <CardContent
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <Link
          style={{ color: '#fff', fontWeight: 'bold' }}
          to={`/video/${item?.id?.videoId}`}
        >
          {item?.snippet?.title || 'title'}
        </Link>

        <Link
          style={{
            color: '#ffffff5f',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
          to={`/channel/${item?.snippet?.channelId}`}
        >
          <Typography>
            {item?.snippet?.channelTitle || 'title'}
          </Typography>
          <CheckCircleIcon sx={{ height: '15px' }} />
        </Link>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
