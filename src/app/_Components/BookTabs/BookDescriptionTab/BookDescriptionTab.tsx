'use client'

import Typography from '@mui/material/Typography';
import DOMPurify from 'dompurify';
import parse from 'html-react-parser';


export default function BookDescriptionTab({bookData}:{bookData:any}){

    const sanitizedHtml = DOMPurify.sanitize(bookData);
    const tsxContent = parse(sanitizedHtml);
return(

    <>
        <Typography component="div" sx={{ color: 'text.secondary', lineHeight: 1.7 }}>
            {tsxContent}
        </Typography>
    </>
)
}