import AboutSection from '@/app/_Components/AboutSection/AboutSection';
import ContactUsForm from '@/app/_Components/Forms/contactUsForm/ContactUsForm';
import SearchSection from '@/app/_Components/SearchSection/SearchSection';
import SectionComp from '@/app/_Components/SectionComp/SectionComp';
import HomeMainSlider from '@/app/_Components/Sliders/HomeMainSlider/HomeMainSlider';

export default async function HomeOfStore() {

    
    return (
      <>
        <HomeMainSlider searchTerm={'bestseller'} maxResults={40} /> 

         <SectionComp  sectionData={
                      {sectionBackground:'diagonal-background', sectionTitle:'About Us'}} 
                    comp={<AboutSection />} 
        />

        <SectionComp  sectionData={
                      {sectionBackground:'points-background', sectionTitle:'Books Section'}} 
                    comp={<SearchSection />} 
        />

        <SectionComp sectionData={
                      {sectionBackground:'diagonal-background', sectionTitle:'ContactUs'}}  
                      comp={<ContactUsForm />} 
        />

        

     </>
    );
  }
  