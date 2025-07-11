import { ISection } from '@/app/_Interfaces/ISection';


export default function SectionComp({comp, sectionData}:ISection){
    
    return (
        <div className={`my-28 ${sectionData.sectionBackground}`}>
            <div className='heading-padding flex items-center justify-center sectionHeading'>
                <h2 className='text-6xl '>{sectionData.sectionTitle}</h2>
            </div>
             {comp}
        </div>

    )
}