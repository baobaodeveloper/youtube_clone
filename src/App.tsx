import { Box } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  ChannelDetail,
  Feed,
  Navbar,
  NotFound,
  SearchFeed,
  VideoDetail,
} from './components';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Box
          sx={{
            backgroundColor: '#000000',
            minHeight: '100vh',
            position: 'relative',
            zIndex: 5,
          }}
        >
          <Navbar />

          <Routes>
            <Route path='/' element={<Feed />} />
            <Route path='/search/:name' element={<SearchFeed />} />
            <Route path='/video/:videoId' element={<VideoDetail />} />
            <Route
              path='/channel/:channelId'
              element={<ChannelDetail />}
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </div>
  );
}

export default App;
