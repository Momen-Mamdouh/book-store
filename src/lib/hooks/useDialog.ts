

'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { IDialog } from '@/app/_Interfaces/IForms';



export function useDialog(routerParam?: ReturnType<typeof useRouter>) {
    const internalRouter = useRouter();

    const router = routerParam ?? internalRouter;
    const [dialogData, setDialogData] = useState< IDialog | null>(null);

    const handleDialogClose = () => {
        const route = dialogData?.route ?? '/';
        setDialogData(null);
        router.push(route);
         
    };

    const showDialog = (dialogData:IDialog)=>{
        setDialogData(dialogData);
        const route = dialogData?.route ?? '/';
        router.push(route); 
        
    }


  return { dialogData, showDialog, handleDialogClose};
}
