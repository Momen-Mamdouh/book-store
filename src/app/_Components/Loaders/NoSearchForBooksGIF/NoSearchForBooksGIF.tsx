import { useEffect, useState } from "react"
import Image from 'next/image';

export default function NoSearchForBooksGIF(){
    const timeToChangeImg:number = 1000;
    const totalImages:number = 4;
    const [currentImg, setCurrentImg] = useState('/images/reponsesImages/booksSearchGif/book_GIF_(1).gif');
    const [, setCurrentImgLength] = useState(1); 


    useEffect(()=>{
        const interval = setInterval(() => {
            setCurrentImgLength(prev => {
                const next = (prev % totalImages) + 1;
                setCurrentImg(`/images/reponsesImages/booksSearchGif/book_GIF_(${next}).gif`);
                return next;
            });
        }, timeToChangeImg);

        return  ()=> clearInterval(interval);

    },[])




    return(
        <>
           <div className="flex items-center justify-center min-h-[50vh]">
                <div className="relative w-[75%] h-[75vh] my-12 rounded-xl overflow-hidden">
                    <Image
                        src={currentImg}
                        alt="Search for Book"
                        fill
                        className="object-cover rounded-xl"
                    />
                </div>
            </div>
        </>
    )
}