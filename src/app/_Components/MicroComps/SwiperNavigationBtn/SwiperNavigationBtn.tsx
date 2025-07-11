
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

type BreakpointSizes = {
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
};

type SwiperNavigationBtnProps = {
  btn: 'swiper-prev' | 'swiper-next';
  btnSize: string | number | BreakpointSizes; 
};

export default function SwiperNavigationBtn(props:SwiperNavigationBtnProps){


    const btnClass = props.btn === 'swiper-prev' ? 'swiper-prev' : 'swiper-next'
    return(
            <>
                <button className={`${btnClass}  text-white p-1 md:p-3 bg-transparent rounded-full shadow pointer-events-auto`}>
                    { btnClass === 'swiper-prev' ? <KeyboardArrowLeftIcon sx={{fontSize:`${props.btnSize}`}} /> :  
                            <KeyboardArrowRightIcon sx={{fontSize:`${props.btnSize}`}}/>}
                </button>
            </>
    )

}