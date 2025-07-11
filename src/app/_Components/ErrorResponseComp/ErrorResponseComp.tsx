'use client';

import { Box, Typography, Container, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { IFetchingResponse } from '@/app/(main)/orders/page';
import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';



export default function ErrorResponseComp({responseStatus=' No Status', error}:IFetchingResponse) {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100%',
        bgcolor: '#f0f0f0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        textAlign: 'center',
      }}
    >
      {/* Background image */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          backgroundImage: 'url("/images/Error_bg.jpg")', 
          backgroundSize: 'cover',
          backgroundPosition: 'center bottom',
          filter: 'brightness(0.9)',
        }}
      />

      {/* Content */}
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
        <Stack spacing={5} alignItems="center" justifyContent="center">
          <Typography variant="h3" color="white">
            Response Status: {responseStatus}
          </Typography>

          <Typography variant="h4" color="white">
            {error}
          </Typography>

        { error !== 'Auth session missing!' && 
            <Link href="/" passHref>
              <MainButton icon={<ArrowBackIcon />} btnTitle='Back to home' btnType='button' 
                          btnIconColor='white' isDisabled={false} customWidth={'auto'}   />
            </Link>
          }
          {error === 'Auth session missing!' && <Link href="/login" passHref>
                                                    <MainButton btnTitle='Login' btnType='button' isDisabled={false} /> 
                                                </Link> }
        </Stack>
      </Container>
    </Box>
  );
}
