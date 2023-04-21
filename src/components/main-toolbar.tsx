import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ReactComponent as Logo } from '../assets/logo.svg'
import { styled } from '@mui/system'
import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { colors } from '../colors';

const StyledButton = styled(Button)(() => ({
  '&:hover': {
    backgroundColor: 'inherit'
  },
  '&:click': {
    backgroundColor: colors.mainBackground
  }
}))

const ToolbarLink = styled(Link)(() => ({
  textDecoration: 'none',
  color: colors.mainText,
  transition: '0.75s ease',
  '&:hover': {
    filter: 'brightness(60%)',
    backgroundColor: 'inherit'
  },
}))

export const loader = () => {
  return true
}

const MainToolbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const links = {
    logo: <ToolbarLink to='/'><Logo width='48px' height='48px'/></ToolbarLink>,
    home: <ToolbarLink to='/'>Home</ToolbarLink>,
    projects: <ToolbarLink to='/projects'>Projects</ToolbarLink>,
    blog: <ToolbarLink to='/blog'>Blog</ToolbarLink>
  }

  const handleMenuOpen = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{height: '100vh', width: '100vw', backgroundColor: colors.mainBackground}}>
      <AppBar position="sticky" sx={{backgroundColor: '#334554'}}>
        <Toolbar sx={{minHeight: '64px', maxHeight: '64px', paddingLeft: '24px'}}>
          <Box maxHeight={48} maxWidth={48}>{links.logo}</Box>
          <Box sx={{ flexGrow: 1}}>
          </Box>

          {isMobile && (
            <>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    backgroundColor: '#334554',
                    minWidth: 150,
                    color: '#FFFFFF',
                    borderRadius: 0
                  }
                }}
              >
                <MenuItem onClick={handleMenuClose}>{links.home}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{links.projects}</MenuItem>
                <MenuItem onClick={handleMenuClose}>{links.blog}</MenuItem>
              </Menu>
            </>
          )}

          {!isMobile && (
            <>
            <StyledButton>{links.home}</StyledButton>
            <StyledButton>{links.projects}</StyledButton>
            <StyledButton>{links.blog}</StyledButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Box id="main-body" sx={{color: colors.mainText, margin: '24px 24px'}}>
        <Outlet />
      </Box>
    </Box>

  );
}

export default MainToolbar