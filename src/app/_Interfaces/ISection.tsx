import { ReactNode } from "react";

export interface ISection{
    comp:ReactNode,
    sectionData:ISectionData,
}
export interface ISectionData{
    sectionTitle:string,
    sectionBackground:string,
}
