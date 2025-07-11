'use client';

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import { Box, Container, Typography, useTheme } from '@mui/material';
import Link from 'next/link';

export default function Error() {
  const theme = useTheme();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 12 },
        px: { xs: 2, md: 4 },
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography
          variant="h1"
          fontWeight="extrabold"
          sx={{
            fontSize: { xs: '6rem', md: '9rem' },
            color: 'primary.main',
            mb: 2,
            letterSpacing: '-2px',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{ mb: 2, color: theme.palette.text.primary }}
        >
           {"Something's missing."}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: 'text.secondary', mb: 4, fontSize: '1.125rem' }}
        >
           {"Sorry, we can't find that page. You'll find lots to explore on the home page."}
        </Typography>

        <Link href="/" passHref>
          <MainButton btnTitle='Home' isDisabled={false} btnIconColor='btnInfo' />
        </Link>
      </Container>
    </Box>
  );
}
