import TabPanel from "@mui/lab/TabPanel";
import BookDescriptionTab from "@/app/_Components/BookTabs/BookDescriptionTab/BookDescriptionTab";
import BookInfoTab from "@/app/_Components/BookTabs/BookInfoTab/BookInfoTab";


export default function BookTab({tabLabel, tabValue, tabData}:{tabLabel:string,tabValue:number, tabData:any}){



    return (
        <>
            <TabPanel value={`${tabValue}`}>
                {tabLabel === "Description" && <BookDescriptionTab bookData={tabData} />}
                {tabLabel === "Info" && <BookInfoTab bookData={tabData} />}
            </TabPanel>
        </>
    )
}