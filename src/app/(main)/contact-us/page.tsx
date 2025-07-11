import ContactUsForm from "@/app/_Components/Forms/contactUsForm/ContactUsForm";
import SectionHero from "@/app/_Components/MicroComps/SectionHero/SectionHero";
import SectionComp from "@/app/_Components/SectionComp/SectionComp";



export default function contactUs(){


    return (

        <>
                 <SectionHero pageName={'contact us'} />

                  <SectionComp sectionData={
                        {sectionBackground:'diagonal-background', sectionTitle:'ContactUs'}}  
                        comp={<ContactUsForm />} 
                         />

        </>
    )
}