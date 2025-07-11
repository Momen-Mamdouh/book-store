'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import AboutImage from '@/../../public/images/aboutImage.png'
import Image from 'next/image'
export default function AboutSection() {

  return (
        <Box component="section" sx={{  position: 'relative' }}>
            <Container maxWidth="lg">

                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 8, alignItems: 'center',}}>
                {/* Left Text Section */}
                    <Stack spacing={4} alignItems={{ xs: 'center', lg: 'flex-start' }} textAlign={{ xs: 'center', lg: 'left' }}>

                        <Typography variant="h4" fontWeight="bold"
                                    sx={{ fontSize: { xs: '2rem', md: '2.5rem' }, color: 'text.primary' }}>
                           {' Building Stronger Communities through Empowering Readers.'}
                        </Typography>

                        <Typography variant="body1" sx={{ color: 'text.secondary', maxWidth: '90%',}}>
                           {` At our Book Store, we believe that every book holds the power to inspire, educate, and transform. Whether 
                            you're diving into fiction, exploring new ideas in non-fiction, or discovering hidden gems from indie authors, 
                            our curated collection is designed to fuel your imagination and deepen your love for reading. By connecting 
                            readers with stories that matter, we aim to build a vibrant community where knowledge and creativity thrive.`}
                        </Typography>

                    </Stack>

                {/* Right Image */}
                <Box sx={{ width: '100%', maxHeight: '75%', borderRadius: 6, overflow: 'hidden', mx: { xs: 'auto', lg: 0 }, }}>
                        <Image src={AboutImage} alt="About Us" layout="responsive"
                            style={{ objectFit: 'cover', width: '100%', height: 'auto', }} priority/>
                </Box>

                </Box>
            </Container>
        </Box>
  );
}
