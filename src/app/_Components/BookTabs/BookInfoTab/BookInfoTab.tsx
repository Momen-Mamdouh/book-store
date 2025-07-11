import {  Stack } from "@mui/material";
import TitleAndDataComp from "@/app/_Components/MicroComps/TitleAndDataComp/TitleAndDataComp";
import BookInfoBtn from "@/app/_Components/Buttons/BookInfoBtn/BookInfoBtn";

export default function BookInfoTab({bookData}:{bookData:any}){

    const tabInfoEntries = [
        { label: "Maturity", value: bookData.booKMaturityRating },
        { label: "Authors", value: bookData.bookAuthors },
        { label: "Publisher", value: bookData.bookPublisher },
        { label: "Published", value: bookData.bookPublishingDate },
        { label: "Language", value: bookData.bookLanguage },
        { label: "SKU", value: bookData.bookStockKeepingUnit },
        { label: "Pages", value: bookData.bookPages },
        { label: "For Sale", value: bookData.bookIsSaleable.salable ?
             <BookInfoBtn PathLinkTarget={'_blank'} pathLink={bookData.bookIsSaleable.googleBuyLink}  btnType={'button'} btnTitle={'Buy'} 
                    customizedBtnStyles={'btnInfo'} customWidth={'100%'} 
                        isDisabled={false} btnIconColor={"white"} />:
              "No" },
        { label: "PDF Available", value: bookData.bookPdf.isAvaliable ?  
                <BookInfoBtn PathLinkTarget={'_blank'} pathLink={bookData.bookDownloadLink}  btnType={'button'} btnTitle={'Download'} 
                    customizedBtnStyles={'btnInfo'} customWidth={'100%'} 
                        isDisabled={false} btnIconColor={"white"} /> : "No" },
        { label: "Is eBook", value: bookData.bookPdf.isEbook ? "Yes" : "No" },
        {
            label: "Preview Link",
            value: bookData.bookPdf.readinglink
            ?  <BookInfoBtn PathLinkTarget={'_blank'} pathLink={bookData.bookPdf.readinglink}  btnType={'button'} btnTitle={'Preview'} 
                    customizedBtnStyles={'btnInfo'} customWidth={'100%'} 
                        isDisabled={false} btnIconColor={"white"} />
            : "N/A"
        },
    ];
    

return(

    <>
        <Stack direction="column" spacing={2} alignItems="center" justifyContent="center" flexWrap="wrap">
            {tabInfoEntries.map((tabInfo, index)=>  <TitleAndDataComp key={index} dataTitle={tabInfo.label} data={tabInfo.value} customDisplay="space-between" customWidth="50%"  />)}
        </Stack>
    </>
)
}