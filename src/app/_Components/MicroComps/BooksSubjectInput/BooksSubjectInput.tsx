'use client'

import { useState, useEffect } from 'react';
import FormControl from '@mui/joy/FormControl';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';

import { useDispatch } from 'react-redux';
import { setBooksSearchKey } from '@/lib/redux/BooksSlice/BooksSlice';

interface ISearchOptions{
    title:string,
    searchQuery:string,
    example:string
}

const filterOptions = createFilterOptions({
  matchFrom: 'start',
  stringify: (option: ISearchOptions) => option.title,
});

export default function BooksSubjectInput() {

  const [selectedKey, setSelectedKey] = useState<null | typeof searchKeys[0]>(null);
  const dispatch = useDispatch();

    useEffect(() => {
    if (selectedKey) {
      dispatch(setBooksSearchKey(selectedKey.searchQuery));
    }
    else{
      dispatch(setBooksSearchKey(''));
    }
  }, [selectedKey, dispatch]);


  

  return (
    <FormControl id="filter-demo" sx={{display:'flex', mb:3,  alignItems:{xs:'center', md:'start'}}}>
      <Autocomplete
        placeholder={selectedKey?.example || 'Search Key'}
        options={searchKeys}
        getOptionLabel={(option) => option.title}
        filterOptions={filterOptions}
        onChange={(_event, newValue) => {
          setSelectedKey(newValue)
        }}

         sx={{width: { xs: '55%',  md: '40%', lg: '25%', xl: '20%'}}} />
    </FormControl>
  );
}


const searchKeys = [
  { title: "Title", searchQuery: 'intitle', example: 'ex: Emily Henry'},
  { title: "Author", searchQuery: 'inauthor', example: 'ex: A Clock Orange'},
  { title: "Publisher", searchQuery: 'inpublisher', example: 'ex: Macmillan' },
  { title: "Category", searchQuery: 'subject', example: 'ex: Fiction' },
  { title: "isbn", searchQuery: 'isbn', example: 'ex: 0345339681' },
  { title: "lccn", searchQuery: 'lccn', example: 'ex: 60-10321' },
  { title: "oclc", searchQuery: 'oclc', example: 'ex: 20043673' }, 
];
