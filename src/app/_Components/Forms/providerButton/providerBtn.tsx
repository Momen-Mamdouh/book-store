'use client'

import { ReactNode } from 'react';

interface IproviderBtn{
  providerName:string,
  providerClasses:string,
  providerVaue:string,
  providerSvg: ReactNode,
  providerLogin : ()=> void,

}

 function ProviderBtn(props:IproviderBtn){;

    return(

         <button  onClick={props.providerLogin} 
                  value={props.providerName}  type="button" 
                  className={props.providerClasses}>
                  {props.providerSvg}
                  {props.providerVaue} 
          </button>

    )

}

export default ProviderBtn

