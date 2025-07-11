import { useState } from 'react';


export default function useMenuAnchor(){
    
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const openMenu = (event: React.MouseEvent<HTMLElement>)=>{
        setAnchorEl(event.currentTarget);
    }

    const closeMenu = ()=>{
        setAnchorEl(null);
    }

    const isOpen = Boolean(anchorEl);

    return {anchorEl, openMenu, closeMenu, isOpen}

}