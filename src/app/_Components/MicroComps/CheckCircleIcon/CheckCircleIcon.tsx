import Box from "@mui/material/Box";
import CheckIcon from '@mui/icons-material/Check';

export default function CheckIconComp(){


    return(
        <>
                <Box
                        sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        backgroundColor: 'gold',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        }}
                 >
                        <CheckIcon sx={{ color: '#1e1e1e', fontSize: 20 }} />
                </Box>
        
        </>
    )
}