
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';

export default function BasicRating({ ratingNumber }: { ratingNumber: number }) {

  return (
    <Box sx={{ '& > legend': { mt: 2 } }}>
      <Rating name="read-only" value={ratingNumber} readOnly />
    </Box>
  );
}
