
import { createSlice } from '@reduxjs/toolkit'
import { User } from '@supabase/supabase-js';

interface UserState {
  user: User | null,
  user_id: string,
  userAddress:string,
  userPhone:string,
  userImg:string,  

  isAuthenticated:boolean,
  isLoading: boolean,
  error: any | null,
}

const initialState: UserState = {
    user: null,
    user_id:'',
    userAddress:'',
    userPhone:'',  
    userImg:'',
    isAuthenticated: false,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    setUserId: (userState, action) => {
        userState.user_id = action.payload;
    },

    setUser: (userState, action) => {
      userState.user = action.payload;
      userState.isAuthenticated = !!action.payload;
    },

    setUserAddress:(userState, action)=>{
        userState.userAddress = action.payload;
        userState.isAuthenticated = !!action.payload;
    },

    setUserPhone:(userState, action)=>{
        userState.userPhone = action.payload;
        userState.isAuthenticated = !!action.payload;
    },

    setUserImg:(userState, action)=>{
        userState.userImg = action.payload;
        userState.isAuthenticated = !!action.payload;
    },

    clearUser: (userState) => {
      userState.user = null;
      userState.isAuthenticated = false;
    },
  },
  
})

export const { setUserId, setUser, clearUser, setUserAddress, setUserPhone, setUserImg } = userSlice.actions
export default userSlice.reducer
