import Box from "@mui/material/Box";
import { ReactNode } from "react";

type TitleAndDataCompProps = {
  dataTitle: string;
  data: string | number | ReactNode | string[];
  customDisplay?: string;
  customWidth?: string;
};

export default function TitleAndDataComp(props:TitleAndDataCompProps){


        return(

            <>
                <Box className={'main-border-bottom'} sx={{ display:'flex', gap:'1rem', alignItems:'center' , 
                        justifyContent:`${props.customDisplay}`, width:`${props.customWidth}`,  }}>

                        <Box component="span" sx={{ fontWeight: '700', fontSize:'1.5rem', color: 'primary.main' }}>
                            {props.dataTitle}:{' '}
                        </Box>

                        <Box component="span" sx={{ fontSize:'1.25rem', color: 'text.secondary' }}>
                            {props.data}
                        </Box>
                        
                </Box>

            </>
        )


}