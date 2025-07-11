'use client'

import { useState, ChangeEvent } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/lib/redux/reduxStore';
import { setBooksSearchTerm, setSearchedBooks, setUserCurrentSearch } from '@/lib/redux/BooksSlice/BooksSlice';


export default function SearchInput() {

    const [currentSearchInput, setCurrentSearchInput] =  useState('');
    const {userCurrentSearchKey} = useSelector((state:RootState)=> state.bookStore);
    const dispatch = useDispatch();

    const searchHandleChange = (e: ChangeEvent<HTMLInputElement>) =>{
        setCurrentSearchInput(e.target.value);
    }

    const handleSearch = () => {     
        const searchTerm =  currentSearchInput !== '' ? `${userCurrentSearchKey}:${currentSearchInput}` : '';
        dispatch(setBooksSearchTerm(searchTerm));
        dispatch(setUserCurrentSearch(currentSearchInput)); 
        if(currentSearchInput === ''){
            dispatch(setSearchedBooks([]))
        }
    };

  return (

    <>
        {userCurrentSearchKey !== '' &&
                 <Box sx={{ display: 'flex', my:1, mb:4, alignItems:'center', width:'100%'  }}>
                    <TextField 
                        id="input-with-sx" 
                        label="Search Term" 
                        variant="standard"
                        value = {currentSearchInput}
                        onChange={searchHandleChange} 
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') handleSearch();
                            ;
                        }}
                        sx={{width: { xs: '55%',  md: '40%', lg: '25%', xl: '20%'}}} />
                    <SearchIcon
                        onClick={handleSearch}
                    sx={{ color: 'action.active',  }} />
            </Box>
       
       
        }
    </>
 
  );
}
 
