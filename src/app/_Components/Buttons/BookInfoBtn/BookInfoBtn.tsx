'use client'

import MainButton from '@/app/_Components/MicroComps/MainButton/MainButton';
import { IMainBtn } from '@/app/_Interfaces/IButtons';
import Link from 'next/link';



export default function  BookInfoBtn(props: IMainBtn) {



  const button = <MainButton {...props}    />;

  return props.pathLink ? <Link href={props.pathLink} target={props.PathLinkTarget} download={props.btnTitle === 'PDF Download'}>{button}</Link> : button;
}