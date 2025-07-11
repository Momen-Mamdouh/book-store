import SectionHero from "@/app/_Components/MicroComps/SectionHero/SectionHero";
import SearchSection from "@/app/_Components/SearchSection/SearchSection";
import SectionComp from "@/app/_Components/SectionComp/SectionComp";



export default function shop(){


    return(

        <>
            <SectionHero pageName={'shop'} />

             <SectionComp  sectionData={
                            {sectionBackground:'points-background', sectionTitle:'Books Section'}} 
                            comp={<SearchSection />} 
                    />
        </>
    )

}