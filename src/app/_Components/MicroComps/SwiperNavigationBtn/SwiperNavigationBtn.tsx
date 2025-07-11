
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

export default function SwiperNavigationBtn(props:any){


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