'use client'

import {useState, SyntheticEvent} from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';

import { IBookTab } from '@/app/_Interfaces/IBookDetails';
import BookTab from '@/app/_Components/MicroComps/BookTab/BookTab';


export default function BookDetailsTabs({bookTabs}:{bookTabs:IBookTab[]}) {
  const [value, setValue] = useState("1");

  const handleChange = (_event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box  sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList centered selectionFollowsFocus  
                    onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Description" value="1" />
            <Tab label="Book Info" value="2" />
          </TabList>
        </Box>
        { bookTabs.map((tab,index)=> 
          <BookTab key={index} tabLabel={tab.tabLabel} tabValue={tab.tabValue} tabData={tab.tabData} />)
        }

      </TabContext>
    </Box>
  );
}
