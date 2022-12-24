import React, { useState } from 'react';
import { categories } from '../utils/constants';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigator = useNavigate();
  const [active, setActive] = useState('');

  const handleClickMenu = (e: string) => {
    setActive(e);
    navigator('/', { state: e });
  };
  return (
    <Box
      sx={{
        borderRight: { md: '1px solid #ffffff2b' },
        height: { md: '92vh', xs: 'auto' },
        overflowY: 'scroll',
        minWidth: { md: '200px', xs: 'auto' },
        display: 'flex',
        flexDirection: { md: 'column', xs: 'row' },
        px: { md: 3, xs: 0 },
        mx: { xs: 1, md: 0 },
        overflowX: { md: 'hidden' },
      }}
    >
      {Array.isArray(categories) &&
        categories.length > 0 &&
        categories.map((item, i) => (
          <Box
            onClick={() => handleClickMenu(item?.name)}
            className='category-btn'
            sx={{
              width: { md: '100%' },
              color: 'red',
              '&:hover': {
                color: 'white',
              },
              backgroundColor: active === item?.name ? 'red' : '',
            }}
            display='flex'
            alignItems='center'
            justifyContent='center'
            key={i}
            color='#fff'
            my={1}
            gap={1}
          >
            <Box
              sx={{
                mt: '5px',
                color: active === item?.name ? '#fff' : '',
              }}
            >
              {item?.icon}
            </Box>
            <Box sx={{ width: { xs: '100px' }, color: '#fff' }}>
              {item?.name}
            </Box>
          </Box>
        ))}
      <Typography
        sx={{
          color: '#ffffff85',
          fontSize: '12px',
          display: { md: 'block', xs: 'none' },
        }}
      >
        Copyright © 2022 JSM Media
      </Typography>
    </Box>
  );
};

export default Sidebar;
