'use client';

import React from 'react';
import { Box, Container, Stack, Typography, Link, IconButton } from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import AutoStoriesTwoToneIcon from "@mui/icons-material/AutoStoriesTwoTone";
import { SvgIconComponent } from '@mui/icons-material';

interface IFooterLinks{
  linkName:string, 
  linkHref:string,
}

interface IFooterIcons{
  iconAriaLabel:string, 
  iconHref:string,
  icon:SvgIconComponent
}

export default function Footer() {

  const footerLinks:IFooterLinks[] = [
      {linkName:'About', linkHref:'/about'},
      {linkName:'Categories', linkHref:'/categories'},
      {linkName:'ContactUs', linkHref:'/contact-us'},
      {linkName:'Terms', linkHref:'/terms'},
  ]

  const footerIcons:IFooterIcons[] = [
      {iconAriaLabel:'GitHub', iconHref:'/https://github.com/Momen-Mamdouh/', icon: GitHubIcon },
      {iconAriaLabel:'LinkedIn', iconHref:'/https://www.linkedin.com/in/mo-men-mamdouh-aa5baa20a/', icon: LinkedInIcon },
  ]

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'primary.main',
        color:'secondary.main',

        fontFamily: 'var(--font-quintessential), cursive',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Stack alignItems="center" spacing={6}>
          {/* Logo */}
        <Box display="flex" alignItems="center" gap={1}>
          <AutoStoriesTwoToneIcon sx={{ fontSize: 40 }} />
          <Box component="span" sx={{ fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'Quintessential' }}>
           {' Book Store'}
          </Box>
        </Box>

          {/* Navigation Links */}
          <Stack
            direction={{ xs: 'column', lg: 'row' }}
            spacing={{ xs: 2, lg: 4 }}
            sx={{color:'secondary.main'}}
            alignItems="center"
            justifyContent="center"
            flexWrap="wrap"
          >
            {footerLinks.map(
              (label) => (
                <Link
                  key={label.linkName}
                  href={label.linkHref}
                  underline="none"
                  sx={{
                    color: 'secondary.main',
                    transition: 'color 0.4s ease-in-out',
                    '&:hover': {
                      color: 'secondaryHoverColor.main',
                    },
                    fontSize:20,
                  }}
                >
                  {label.linkName}
                </Link>
              )
            )}
          </Stack>

          {/* Social Icons */}
          <Stack direction="row" spacing={2}>

            {footerIcons.map(({icon:Icon, iconHref, iconAriaLabel}, index)=>(
              <IconButton key={index} href={iconHref} color="inherit" aria-label={iconAriaLabel}>
               <Icon />
            </IconButton>
            ))}

          </Stack>

          {/* Copyright */}
          <Typography color="secondary.main" textAlign="center">
           {" © 2025 Mo'men Mamdouh. All rights reserved."}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
