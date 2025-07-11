'use client'

import { IBookTabInfo } from '@/app/_Interfaces/IBookDetails';
import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';


type TabDataProps = {
  bookData: string | IBookTabInfo;
};

export default function BookDescriptionTab({bookData}:TabDataProps){
    if(typeof bookData !== 'string'){
        return (    <Typography component="div" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                        {'Invalid description format'}
                    </Typography>
                )
    }

    const sanitizedHtml = DOMPurify.sanitize(bookData);
    const tsxContent = parse(sanitizedHtml);
   
    return(
            <Typography component="div" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
                {tsxContent}
            </Typography>
        )
}