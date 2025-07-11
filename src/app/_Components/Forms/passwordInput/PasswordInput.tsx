
'use client'

import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import FilledInput from '@mui/material/FilledInput';
import { useState } from 'react';
import FormHelperText from '@mui/material/FormHelperText';

interface IPasswordInputProps{
  inputValue:string,
  inputTypeName?:string,
  inputValueOnChange:(e: React.ChangeEvent<HTMLInputElement>) => void,
  inputOnBlur?: (e: React.FocusEvent<HTMLInputElement>) => void,
  error?:boolean,
  helperText?: false | "" | React.JSX.Element | undefined,
}



export default function PasswordInput(props:IPasswordInputProps){



    
        const [showPassword, setShowPassword] = useState(false);
    
        const handleClickShowPassword = () => setShowPassword((show) => !show);
      
        const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
        };
      
        const handleMouseUpPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
          event.preventDefault();
        };
    


    return(
        <>

    <FormControl sx={{ width: '75%' }} variant="filled">
          <InputLabel htmlFor="filled-adornment-password" sx={{ fontSize: '1.25rem' }}>{props.inputTypeName}</InputLabel>
          <FilledInput
            id={props.inputTypeName}
            name={props.inputTypeName}
            type={showPassword ? 'text' : 'password'}
            onChange={props.inputValueOnChange}
            onBlur={props.inputOnBlur}
            value={props.inputValue}
            error={props.error}
            sx={{ fontSize: '1.25rem', backgroundColor:'secondary.main' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                 
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
           {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
        </FormControl>
        
        </>
    )
}