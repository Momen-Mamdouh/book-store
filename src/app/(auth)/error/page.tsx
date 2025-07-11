'use client';

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import { Box, Container, Typography, Stack } from '@mui/material';
import Link from 'next/link';

export default function AuthErrorPage() {


  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h2"
          fontWeight="bold"
          color="error.main"
          sx={{
            fontSize: { xs: '2.5rem', md: '3.5rem' },
            mb: 2,
          }}
        >
          Authentication Error
        </Typography>

        <Typography
          variant="body1"
          sx={{ fontSize: '1.125rem', color: 'text.secondary', mb: 4 }}
        >
          Oops! Something went wrong while logging you in or registering your account.
          Please try again, or contact support if the problem persists.
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
          <Link href="/login" passHref>
            <MainButton btnTitle='Try Logging In' isDisabled={false}  />
            
          </Link>

          <Link href="/register" passHref>
            <MainButton btnTitle='Create Account' isDisabled={false}  />
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}
