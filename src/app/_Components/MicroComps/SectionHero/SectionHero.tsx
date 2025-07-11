import { Typography } from "@mui/material";
import Stack from "@mui/material/Stack";


export default function SectionHero({pageName}:{pageName:string}){

    const heroImg = pageName === 'shop'? `/images/bookShop.jpg` : 
                    pageName === 'contact us' ? '/images/bookLocation.jpg' : '';
    const heroText = pageName.toUpperCase();
    return(
        <>
            <Stack className="flex items-center justify-center text-center" 
                    sx={{backgroundImage:`url(${heroImg})`, backgroundSize:'cover', 
                    backgroundPosition:'center', backgroundRepeat:'no-repeat', height:'75vh'}}>

                    <Typography component={'h1'} variant="h1" color='white'> {heroText} </Typography>
                    
            </Stack>

        </>
    )
}