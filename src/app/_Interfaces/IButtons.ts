import { ReactNode } from "react";
import {  IBookOrders } from "./IAddedBookData";


export interface IMainBtn{
    pathLink?:string,
    PathLinkTarget?:string,
    googleBuyLink?:string,
    siteBuyLink?:string,
    cartPayLoad?:IBookOrders,
    cartCheckOut?:IBookOrders[],
    btnTitle:string,
    btnType?:"submit" | "reset" | "button" | undefined,
    isDisabled:boolean,
    customizedBtnStyles?: string,
    customWidth?: string,
    btnIconColor?:string,
    icon?: ReactNode;
    btnFunction?: () => void  ;
 
}


