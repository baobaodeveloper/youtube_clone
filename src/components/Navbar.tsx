import { Box, InputBase } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from '../utils/constants';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  zIndex: 10,
  borderRadius: '20px',
  backgroundColor: '#fff',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
  [theme.breakpoints.up('md')]: {
    width: '416px',
  },
  [theme.breakpoints.down('md')]: {
    width: '200px',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  right: 10,
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  zIndex: 20,
  color: 'red',
  height: '35px',
  width: '35px',
  borderRadius: '100%',
  '&:hover': {
    background: 'rgba(0,0,0,0.05)',
  },
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '90%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(1)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const Navbar = () => {
  const navigator = useNavigate();
  const [search, setSearch] = useState('');

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (search) {
      navigator(`/search/${search}`, { state: search });
    } else {
      navigator('/');
    }
  };
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      sx={{
        position: 'sticky',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: '#000',
        p: { md: 4, xs: 2 },
      }}
    >
      <Link to='/' style={{ height: '45px' }}>
        <Box
          sx={{ height: '100%' }}
          component='img'
          src={logo}
          alt='logo'
        ></Box>
      </Link>

      <Box component='form' onSubmit={handleSearch}>
        <Search>
          <StyledInputBase
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search…'
            inputProps={{ 'aria-label': 'search' }}
          />
          <Box component='button' type='submit'>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
          </Box>
        </Search>
      </Box>
    </Box>
  );
};

export default Navbar;
