"use client";

import { MouseEvent } from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useSupabaseSession } from "@/utils/supabase/clientSession";
import { createClient } from "@/utils/supabase/client";

import imageLoader from "@/../../public/imageLoader.gif";
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, 
        MenuItem, Container, Avatar, Tooltip, 
        Stack} from "@mui/material";
import { styled, alpha } from '@mui/material/styles';   

import MenuIcon from "@mui/icons-material/Menu";
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';


import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/reduxStore";
import CartMenu from "@/app/_Components/CartMenu/CartMenu";
import { IBookItem, IBookData } from "@/app/_Interfaces/IAddedBookData";
import WishListMenu from "@/app/_Components/WishListMenu/WishListMenu";




const pages = [
  { pageName: "Home", pageLink: "/" },
  { pageName: "Shop", pageLink: "/shop" },
  { pageName: "Contact Us", pageLink: "/contact-us" },
 
];

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export default function Navbar() {
  
    const supabase = createClient();
    const router = useRouter();
    const { session, authenticated } = useSupabaseSession();

    const cartItems = useSelector((state: RootState) => state.cartStore.cartItems);

    
    const wishListItems = useSelector((state: RootState) => state.wishListStore.wishListItems);
    const cartMenuItems: IBookItem[] = cartItems.map((item)=>{
      return {
      id: item.book_id,
      title: item.bookOrder.book_title,
      quantity: item.bookOrder.book_count,
      price: item.bookOrder.book_price,
      img: item.bookOrder.book_img ,
    }});

     const whishLsitMenuItems: IBookData[] = wishListItems.map((item)=>{
      return {
      book_id: item.book_id,
      user_id: '',
      book_title: item.bookOrder.book_title,
      book_count: item.bookOrder.book_count,
      book_price: item.bookOrder.book_price,
      book_img: item.bookOrder.book_img ,
    }});

   
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => setAnchorElNav(event.currentTarget);
  const handleOpenUserMenu = (event: MouseEvent<HTMLElement>) => setAnchorElUser(event.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);
  const handleCloseUserMenu = () => setAnchorElUser(null);

  const handleLogout = async () => {
     const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Logout failed:', error.message);
      return;
    }

    router.replace('/login');
  };

  const settings = authenticated
    ? [
        { name: "Profile", action: () => router.push("/profile") },
        { name: "Logout", action: handleLogout },
      ]
    : [
        { name: "Register", action: () => router.push("/register") },
        { name: "Log in", action: () => router.push("/login") },
      ];

  return (
    <AppBar position="sticky"  className='font-quintessential'>
      <Container maxWidth="xl" sx={{ backgroundColor: "primary.main", color: "secondary.main"}}>
        <Toolbar disableGutters>
          <AutoStoriesTwoToneIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Book Store
          </Typography>



          {/* Mobile View */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.pageName} onClick={handleCloseNavMenu}>
                  <Typography component={Link} href={page.pageLink} sx={{ textAlign: "center" }}>
                    {page.pageName}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
              
          </Box>
          <AutoStoriesTwoToneIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component={Link}
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Book Store
          </Typography>

          {/* Desktop View SearchBar and Pages */}
          <Box sx={{ flexGrow: 1, alignItems: "center", justifyContent:"space-around", display: { xs: "none", md: "flex" } }}>

             <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
            </Search>

            <Stack sx={{display:'flex', flexDirection:'row', gap:'3rem'}}>
                {pages.map((page) => (
                    <Typography
                      component={Link}
                      href={page.pageLink}
                      key={page.pageName}
                      onClick={handleCloseNavMenu}
                      sx={{
                        my: 2,
                        color: "white",
                        display: "block",
                        textTransform: "capitalize",
                        fontSize: "1.25rem",
                      }}
                    >
                      {page.pageName}
                    </Typography>
               ))}

            </Stack>

            
          </Box>

          {/* Avatar + Settings */}
          <Box sx={{ flexGrow: 0, display:'flex', flexDirection:'row', gap:{xs:'0', md:'1rem'} }}>

               <WishListMenu wishListItems={whishLsitMenuItems} />


                <CartMenu cartItems={cartMenuItems} />


            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Profile"
                  sx={{width:'3rem', height:'3rem'}}
                  src={
                    authenticated
                      ? session?.user?.user_metadata?.avatar_url ?? undefined
                      : imageLoader.src
                  }
                />
              </IconButton>
            </Tooltip>

            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              sx={{ mt: "45px" }}
            >
              {settings.map(({ name, action }) => (
                <MenuItem
                  key={name}
                  onClick={() => {
                    handleCloseUserMenu();
                    action();
                  }}
                >
                  <Typography sx={{ textAlign: "center" }}>{name}</Typography>
                </MenuItem>
              ))}
            </Menu>

          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
