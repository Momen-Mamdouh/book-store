import TabPanel from "@mui/lab/TabPanel";
import BookDescriptionTab from "@/app/_Components/BookTabs/BookDescriptionTab/BookDescriptionTab";
import BookInfoTab from "@/app/_Components/BookTabs/BookInfoTab/BookInfoTab";
import { IBookTabInfo } from "@/app/_Interfaces/IBookDetails";

type TabProps = {
  tabValue: number;
  tabLabel: string;
  tabData: string | IBookTabInfo;
};

export default function BookTab({tabLabel, tabValue, tabData}:TabProps){



    return (
        <>
            <TabPanel value={`${tabValue}`}>
                {tabLabel === "Description" && typeof tabData === "string" && ( <BookDescriptionTab bookData={tabData} />)}
                {tabLabel === "Info" && typeof tabData !== "string" && ( <BookInfoTab bookData={tabData} />)}
            </TabPanel>
        </>
    )
}